import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  memo,
} from "react";
import { motion } from "framer-motion";
import {
  FaEthereum,
  FaCode,
  FaExchangeAlt,
  FaExternalLinkAlt,
  FaFlask,
  FaCube,
} from "react-icons/fa";
import { SiPolygon } from "react-icons/si";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

// Enhanced stat card with count-up animation and addresses
const StatCard = memo(
  ({
    index,
    title,
    value,
    icon,
    color,
    addresses,
    chainIcon,
    isNumeric = true,
    suffix = "",
  }) => {
    const [animatedValue, setAnimatedValue] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        },
        { threshold: 0.1 }
      );

      const currentRef = elementRef.current;
      if (currentRef) {
        observer.observe(currentRef);
      }

      return () => {
        if (currentRef) {
          observer.unobserve(currentRef);
        }
      };
    }, [isVisible]);

    useEffect(() => {
      if (!isVisible || !isNumeric) return;

      const numericValue = parseInt(value);
      const step = Math.max(1, Math.floor(numericValue / 30));
      let current = 0;

      const interval = setInterval(() => {
        current += step;
        if (current >= numericValue) {
          setAnimatedValue(numericValue);
          clearInterval(interval);
        } else {
          setAnimatedValue(current);
        }
      }, 30);

      return () => clearInterval(interval);
    }, [isVisible, value, isNumeric]);

    return (
      <motion.div
        ref={elementRef}
        variants={fadeIn("up", "spring", index * 0.2, 0.75)}
        className="bg-black-200 p-6 rounded-3xl xs:w-[320px] w-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
      >
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <div className="text-white font-medium text-[16px] mb-1 flex items-center justify-between">
              <span>{title}</span>
              {chainIcon && <span className="ml-2">{chainIcon}</span>}
            </div>
            <h3 className="text-white font-black text-[36px] flex items-center">
              <span>
                {isNumeric
                  ? isVisible
                    ? animatedValue.toLocaleString()
                    : "0"
                  : value}
              </span>
              {suffix && (
                <span className="text-[18px] font-bold ml-2 text-secondary self-center">
                  {suffix}
                </span>
              )}
            </h3>
            {addresses?.length > 0 && (
              <div className="mt-2 flex flex-col gap-2">
                {addresses.map((address, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <p className="text-secondary text-[12px] truncate max-w-[160px]">
                      {address.isENS
                        ? address.value
                        : `${address.value.slice(0, 6)}...${address.value.slice(
                            -4
                          )}`}
                    </p>
                    <a
                      href={`${address.explorer}/address/${
                        address.actualAddress || address.value
                      }`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300"
                    >
                      <FaExternalLinkAlt size={12} />
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div
            className={`${color} w-12 h-12 rounded-full flex justify-center items-center transform transition-transform duration-300 hover:scale-110`}
          >
            {icon}
          </div>
        </div>
      </motion.div>
    );
  }
);

// Animated deployment activity chart
const ActivityChart = memo(({ data, title }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedData, setAnimatedData] = useState([]);
  const chartRef = useRef(null);

  const monthLabels = useMemo(
    () => [
      "Mar 23",
      "Apr 23",
      "May 23",
      "Jun 23",
      "Jul 23",
      "Aug 23",
      "Sep 23",
      "Oct 23",
      "Nov 23",
      "Dec 23",
      "Jan 24",
      "Feb 24",
    ],
    []
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isVisible) {
          setIsVisible(true);
          setAnimatedData(Array(data.length).fill(0));
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = chartRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [isVisible, data.length]);

  useEffect(() => {
    if (!isVisible || !animatedData.length) return;

    const interval = setInterval(() => {
      setAnimatedData((prev) => {
        const newData = [...prev];
        let stillAnimating = false;

        for (let i = 0; i < data.length; i++) {
          if (newData[i] < data[i]) {
            const stepSize = Math.max(1, Math.floor(data[i] / 15));
            newData[i] = Math.min(data[i], newData[i] + stepSize);
            stillAnimating = true;
          }
        }

        if (!stillAnimating) {
          clearInterval(interval);
        }

        return newData;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isVisible, data, animatedData.length]);

  const maxValue = useMemo(() => Math.max(...data), [data]);

  const calculateHeight = useCallback(
    (value) => {
      return value === 0 ? 4 : Math.max(16, (value / maxValue) * 80);
    },
    [maxValue]
  );

  return (
    <motion.div
      ref={chartRef}
      variants={fadeIn("up", "spring", 0.5, 0.75)}
      className="bg-black-200 p-6 rounded-3xl w-full shadow-xl mb-10"
    >
      <h3 className="text-white font-bold text-[22px] mb-6">
        {title || "Transaction Activity"}
      </h3>

      <div className="flex items-end h-[100px] justify-between">
        {animatedData.map((value, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className="w-8 rounded-t-sm bg-gradient-to-t from-purple-600 to-blue-500 cursor-pointer hover:from-purple-500 hover:to-blue-400 transition-colors"
              style={{
                height: `${calculateHeight(value)}px`,
                transition: "height 0.4s ease-out",
              }}
              title={`${data[index]} transactions in ${monthLabels[index]}`}
            />
            <span className="text-secondary text-[10px] mt-2">
              {monthLabels[index]}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
});

// Animated highlight section
const HighlightSection = memo(({ title, value, description, icon, color }) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const step = Math.max(1, Math.floor(value / 30));
    let current = 0;

    const interval = setInterval(() => {
      current += step;
      if (current >= value) {
        setAnimatedValue(value);
        clearInterval(interval);
      } else {
        setAnimatedValue(current);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [isVisible, value]);

  return (
    <motion.div
      ref={sectionRef}
      variants={fadeIn("up", "spring", 0.3, 0.75)}
      className={`bg-gradient-to-r ${color} p-6 rounded-3xl w-full shadow-xl mb-6`}
    >
      <div className="flex items-center gap-4 mb-2">
        <div className="bg-white/10 p-3 rounded-full">{icon}</div>
        <h3 className="text-white font-bold text-[22px]">{title}</h3>
      </div>
      <div className="text-white font-black text-[42px] mb-2">
        {isVisible ? animatedValue.toLocaleString() : 0}
      </div>
      <p className="text-white/80 text-[16px]">{description}</p>
    </motion.div>
  );
});

// Network breakdown card
const NetworkBreakdownCard = memo(({ icon, network, description }) => (
  <div className="flex items-center gap-3 bg-black-100 p-4 rounded-xl">
    <div className="w-10 h-10 flex items-center justify-center">{icon}</div>
    <div>
      <p className="text-white font-bold">{network}</p>
      <p className="text-secondary text-sm">{description}</p>
    </div>
  </div>
));

// Development stats card
const DevStatsCard = memo(() => (
  <div className="mt-4 bg-black-100 p-4 rounded-xl">
    <div className="flex items-center gap-2 mb-2">
      <FaCode size={16} className="text-amber-400" />
      <h4 className="text-white font-medium text-[16px]">Development Stats</h4>
    </div>
    <div className="grid grid-cols-2 gap-3">
      <div>
        <p className="text-secondary text-xs">Test Contracts</p>
        <p className="text-white font-bold text-lg flex items-center">
          <span>143</span>
          <span className="text-sm text-secondary ml-1 self-center">
            deployed
          </span>
        </p>
      </div>
      <div>
        <p className="text-secondary text-xs">First Activity</p>
        <p className="text-white font-bold text-lg">Mar 2023</p>
      </div>
      <div>
        <p className="text-secondary text-xs">Address 1</p>
        <p className="text-white font-bold text-lg flex items-center">
          <span>19,759</span>
          <span className="text-sm text-secondary ml-1 self-center">
            transactions
          </span>
        </p>
      </div>
      <div>
        <p className="text-secondary text-xs">Address 2</p>
        <p className="text-white font-bold text-lg flex items-center">
          <span>342</span>
          <span className="text-sm text-secondary ml-1 self-center">
            transactions
          </span>
        </p>
      </div>
    </div>
  </div>
));

// Main component
const OnchainScore = () => {
  // Hardcoded data - memoized to prevent unnecessary recreations
  const blockchainData = useMemo(
    () => ({
      totalTransactions: 20370,
      contractsDeployed: 27,

      // Activity data with huge variations - peaks and valleys (April reduced)
      activityData: [
        320, 1640, 950, 3850, 280, 1650, 2740, 1050, 2980, 1250, 3480, 2950,
      ],

      addresses: {
        ethereum: [
          {
            value: "0x4d5F0a912443249BDb744443C7F01fA61Be9fE3D",
            explorer: "https://etherscan.io",
          },
          {
            value: "0xb5fD7F87414e97126d118c060041577EC16049EB",
            explorer: "https://etherscan.io",
          },
        ],
        polygon: [
          {
            value: "0xB8a0a11107DF9f0F2aD83ab639C9faf9bA4bD775",
            explorer: "https://polygonscan.com",
          },
        ],
        testnet: [
          {
            value: "0x316adBe2505856d4c4D67573dC6b6648453faEa9",
            explorer: "https://sepolia.etherscan.io",
          },
          {
            value: "0x1ad0ae8E1DBe78c7313cB8234C3F753adb088A15",
            explorer: "https://sepolia.etherscan.io",
          },
        ],
      },
    }),
    []
  );

  // Memoize network breakdown cards for better performance
  const networkBreakdowns = useMemo(
    () => [
      {
        icon: <FaEthereum size={24} color="white" />,
        network: "Ethereum",
        description: "18 contracts deployed",
      },
      {
        icon: <FaCube size={24} color="white" />,
        network: "Base",
        description: "6 contracts deployed",
      },
      {
        icon: <SiPolygon size={24} color="white" />,
        network: "Polygon",
        description: "3 contracts deployed",
      },
    ],
    []
  );

  return (
    <div className="mt-12 bg-black-100 rounded-[20px]">
      <div
        className={`bg-tertiary rounded-2xl ${styles.padding} min-h-[300px]`}
      >
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>My blockchain footprint</p>
          <h2 className={styles.sectionHeadText}>Onchain Score.</h2>
        </motion.div>
        <motion.div
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px] mb-20"
        >
          Metrics showcasing my blockchain activity and development experience
          across various networks. These statistics represent transactions and
          smart contracts I've deployed on both mainnet and testnet
          environments.
        </motion.div>
      </div>

      <div className={`-mt-20 pb-14 ${styles.paddingX}`}>
        {/* Highlights Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <HighlightSection
            title="Total Transactions"
            value={blockchainData.totalTransactions}
            description="Combined transaction count across all networks"
            icon={<FaExchangeAlt size={24} color="white" />}
            color="from-purple-600 to-blue-600"
          />
          <HighlightSection
            title="Contract Deployments"
            value={blockchainData.contractsDeployed}
            description="Smart contracts deployed to production networks"
            icon={<FaCode size={24} color="white" />}
            color="from-emerald-500 to-green-500"
          />
        </div>

        {/* Activity Chart */}
        <ActivityChart
          data={blockchainData.activityData}
          title="Transaction Activity (Mar 2023 - Feb 2024)"
        />

        {/* Network Cards */}
        <div className="mb-10">
          <div className="flex items-center mb-6">
            <div className="bg-purple-600 w-2 h-12 rounded-full mr-4"></div>
            <h3 className="text-white font-bold text-[24px]">
              Network Breakdown
            </h3>
          </div>

          <div className="bg-black-200 p-6 rounded-3xl w-full mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {networkBreakdowns.map((item, index) => (
                <NetworkBreakdownCard
                  key={index}
                  icon={item.icon}
                  network={item.network}
                  description={item.description}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Addresses Section */}
        <div className="mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center mb-4">
                <div className="bg-blue-600 w-1 h-6 rounded-full mr-3"></div>
                <h3 className="text-white font-bold text-[20px]">
                  Mainnet Addresses
                </h3>
              </div>
              <div className="bg-black-200 p-5 rounded-xl">
                <StatCard
                  index={0}
                  title="Ethereum Addresses"
                  value={245}
                  suffix="transactions"
                  icon={<FaEthereum size={24} color="white" />}
                  color="bg-gradient-to-r from-blue-600 to-indigo-600"
                  addresses={blockchainData.addresses.ethereum}
                />
                <div className="mt-4">
                  <StatCard
                    index={1}
                    title="Polygon Address"
                    value={92}
                    suffix="transactions"
                    icon={<SiPolygon size={24} color="white" />}
                    color="bg-gradient-to-r from-purple-600 to-pink-600"
                    addresses={blockchainData.addresses.polygon}
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center mb-4">
                <div className="bg-amber-500 w-1 h-6 rounded-full mr-3"></div>
                <h3 className="text-white font-bold text-[20px]">
                  Testnet Activity
                </h3>
              </div>
              <div className="bg-black-200 p-5 rounded-xl">
                <StatCard
                  index={3}
                  title="Sepolia Testnet"
                  value={20101}
                  suffix="transactions"
                  icon={<FaFlask size={24} color="white" />}
                  color="bg-gradient-to-r from-amber-500 to-orange-500"
                  addresses={blockchainData.addresses.testnet}
                  chainIcon={<FaEthereum size={12} />}
                />
                <DevStatsCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(OnchainScore, "onchain");
