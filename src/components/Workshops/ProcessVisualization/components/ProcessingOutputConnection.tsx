import { Box } from "@mantine/core";

import { motion } from "framer-motion";

import { createConnectionVariants } from "../animations";

interface ProcessingOutputConnectionProps {
  shouldReduceMotion: boolean;
  isDesktop: boolean;
}

export const ProcessingOutputConnection = ({
  shouldReduceMotion,
  isDesktop,
}: ProcessingOutputConnectionProps) => {
  const connectionVariants = createConnectionVariants(shouldReduceMotion);

  if (isDesktop) {
    return (
      <Box
        style={{
          position: "relative",
          width: "100px",
          height: "auto",
          marginTop: "-10px",
          marginBottom: "-10px",
          marginLeft: "-10px",
          alignSelf: "stretch",
        }}
      >
        <svg
          width="120"
          height="100%"
          style={{ position: "absolute", top: 0, left: 0 }}
          viewBox="0 0 120 200"
          preserveAspectRatio="xMidYMid meet"
        >
          <motion.path
            d="M10,100 L110,100"
            stroke="var(--border-color)"
            strokeWidth="3"
            fill="none"
            variants={connectionVariants}
            initial="hidden"
            animate="visible"
          />
          <circle cx="10" cy="100" r="4" fill="var(--primary-red)" opacity="0">
            <animate
              attributeName="cx"
              values="10;110"
              dur="2s"
              repeatCount="indefinite"
              begin="2s"
            />
            <animate
              attributeName="opacity"
              values="0;0.3;1;1;0.3;0"
              dur="2s"
              repeatCount="indefinite"
              begin="2s"
            />
          </circle>
          <circle cx="10" cy="100" r="3" fill="var(--primary-red)" opacity="0">
            <animate
              attributeName="cx"
              values="10;110"
              dur="2s"
              repeatCount="indefinite"
              begin="3s"
            />
            <animate
              attributeName="opacity"
              values="0;0.2;0.8;0.8;0.2;0"
              dur="2s"
              repeatCount="indefinite"
              begin="3s"
            />
          </circle>
          <circle cx="10" cy="100" r="3" fill="var(--primary-red)" opacity="0">
            <animate
              attributeName="cx"
              values="10;110"
              dur="2s"
              repeatCount="indefinite"
              begin="3.5s"
            />
            <animate
              attributeName="opacity"
              values="0;0.2;0.8;0.8;0.2;0"
              dur="2s"
              repeatCount="indefinite"
              begin="3.5s"
            />
          </circle>
        </svg>
      </Box>
    );
  }

  // Mobile version
  return (
    <Box
      style={{
        position: "relative",
        width: "100%",
        height: "60px",
        marginTop: "-10px",
        marginBottom: "-10px",
      }}
    >
      <svg
        width="100%"
        height="60"
        style={{ position: "absolute", top: 0, left: 0 }}
        viewBox="0 0 100 60"
        preserveAspectRatio="xMidYMid meet"
      >
        <motion.path
          d="M50,10 L50,50"
          stroke="var(--border-color)"
          strokeWidth="3"
          fill="none"
          variants={connectionVariants}
          initial="hidden"
          animate="visible"
        />
        <circle cx="50" cy="10" r="4" fill="var(--primary-red)" opacity="0">
          <animate
            attributeName="cy"
            values="10;50"
            dur="2s"
            repeatCount="indefinite"
            begin="2s"
          />
          <animate
            attributeName="opacity"
            values="0;0.3;1;1;0.3;0"
            dur="2s"
            repeatCount="indefinite"
            begin="2s"
          />
        </circle>
        <circle cx="50" cy="10" r="3" fill="var(--primary-red)" opacity="0">
          <animate
            attributeName="cy"
            values="10;50"
            dur="2s"
            repeatCount="indefinite"
            begin="3s"
          />
          <animate
            attributeName="opacity"
            values="0;0.2;0.8;0.8;0.2;0"
            dur="2s"
            repeatCount="indefinite"
            begin="3s"
          />
        </circle>
        <circle cx="50" cy="10" r="3" fill="var(--primary-red)" opacity="0">
          <animate
            attributeName="cy"
            values="10;50"
            dur="2s"
            repeatCount="indefinite"
            begin="3.5s"
          />
          <animate
            attributeName="opacity"
            values="0;0.1;0.6;0.6;0.1;0"
            dur="2s"
            repeatCount="indefinite"
            begin="3.5s"
          />
        </circle>
      </svg>
    </Box>
  );
};
