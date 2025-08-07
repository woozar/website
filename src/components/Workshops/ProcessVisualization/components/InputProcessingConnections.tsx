import { Box } from "@mantine/core";

import { motion } from "framer-motion";

import { createConnectionVariants } from "../animations";

interface InputProcessingConnectionsProps {
  inputCount: number;
  shouldReduceMotion: boolean;
  isDesktop: boolean;
}

export const InputProcessingConnections = ({
  inputCount,
  shouldReduceMotion,
  isDesktop,
}: InputProcessingConnectionsProps) => {
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
          {Array.from({ length: inputCount }).map((_, i: number) => {
            const totalInputs = inputCount;
            const yStart =
              totalInputs === 1
                ? 100
                : (i / Math.max(totalInputs - 1, 1)) * 160 + 20;
            const yEnd = 100;

            return (
              <g key={`connection-${i}`}>
                <motion.path
                  d={
                    totalInputs === 1
                      ? `M10,100 L110,100`
                      : `M10,${yStart} Q60,${(yStart + yEnd) / 2} 110,${yEnd}`
                  }
                  stroke="var(--border-color)"
                  strokeWidth="2"
                  fill="none"
                  variants={connectionVariants}
                  initial="hidden"
                  animate="visible"
                />
                <circle r="3" fill="var(--primary-orange)" opacity="0">
                  <animateMotion
                    dur="2.5s"
                    repeatCount="indefinite"
                    begin={`${i * 0.8}s`}
                    path={
                      totalInputs === 1
                        ? `M10,100 L110,100`
                        : `M10,${yStart} Q60,${(yStart + yEnd) / 2} 110,${yEnd}`
                    }
                  />
                  <animate
                    attributeName="opacity"
                    values="0;0.2;1;1;0.2;0"
                    dur="2.5s"
                    repeatCount="indefinite"
                    begin={`${i * 0.8}s`}
                  />
                </circle>
                <circle r="2" fill="var(--primary-orange)" opacity="0">
                  <animateMotion
                    dur="2.5s"
                    repeatCount="indefinite"
                    begin={`${i * 0.8 + 1.2}s`}
                    path={
                      totalInputs === 1
                        ? `M10,100 L110,100`
                        : `M10,${yStart} Q60,${(yStart + yEnd) / 2} 110,${yEnd}`
                    }
                  />
                  <animate
                    attributeName="opacity"
                    values="0;0.1;0.7;0.7;0.1;0"
                    dur="2.5s"
                    repeatCount="indefinite"
                    begin={`${i * 0.8 + 1.2}s`}
                  />
                </circle>
              </g>
            );
          })}
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
        {Array.from({ length: inputCount }).map((_, i: number) => {
          const totalInputs = inputCount;
          const spacing = 160 / (totalInputs + 1);
          const startX = (i + 1) * spacing - 30;
          const endX = 50;

          return (
            <g key={`connection-${i}`}>
              <motion.path
                d={`M${startX},10 Q${(startX + endX) / 2},30 ${endX},50`}
                stroke="var(--border-color)"
                strokeWidth="2"
                fill="none"
                variants={connectionVariants}
                initial="hidden"
                animate="visible"
              />
              <circle r="3" fill="var(--primary-orange)" opacity="0">
                <animateMotion
                  dur="2.5s"
                  repeatCount="indefinite"
                  begin={`${i * 0.8}s`}
                  path={`M${startX},10 Q${(startX + endX) / 2},30 ${endX},50`}
                />
                <animate
                  attributeName="opacity"
                  values="0;0.2;1;1;0.2;0"
                  dur="2.5s"
                  repeatCount="indefinite"
                  begin={`${i * 0.8}s`}
                />
              </circle>
              <circle r="2" fill="var(--primary-orange)" opacity="0">
                <animateMotion
                  dur="2.5s"
                  repeatCount="indefinite"
                  begin={`${i * 0.8 + 1.2}s`}
                  path={`M${startX},10 Q${(startX + endX) / 2},30 ${endX},50`}
                />
                <animate
                  attributeName="opacity"
                  values="0;0.1;0.7;0.7;0.1;0"
                  dur="2.5s"
                  repeatCount="indefinite"
                  begin={`${i * 0.8 + 1.2}s`}
                />
              </circle>
            </g>
          );
        })}
      </svg>
    </Box>
  );
};
