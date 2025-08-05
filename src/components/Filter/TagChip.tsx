/// <reference types="../../css-modules" />
import { Badge, type BadgeProps } from "@mantine/core";

import { Variants, motion } from "framer-motion";

import styles from "./TagChip.module.css";

interface TagChipProps extends Omit<BadgeProps, "onClick"> {
  tag: string;
  count?: number;
  isSelected?: boolean;
  isPrimary?: boolean;
  onClick?: (tag: string, e?: React.MouseEvent) => void;
}

export const TagChip = ({
  tag,
  count,
  isSelected = false,
  isPrimary = false,
  onClick,
  ...props
}: TagChipProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e?.stopPropagation();
    onClick?.(tag, e);
  };

  const chipVariants: Variants = {
    idle: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  return (
    <motion.div
      variants={chipVariants}
      initial="idle"
      whileHover="hover"
      whileTap="tap"
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Badge
        size="sm"
        radius="xl"
        variant={isSelected ? "filled" : "outline"}
        color={isPrimary ? "red" : "orange"}
        className={styles.tagChip}
        style={{
          cursor: onClick ? "pointer" : "default",
          ...props.style,
        }}
        onClick={handleClick}
        {...props}
      >
        {tag}
        {count !== undefined && (
          <span style={{ fontSize: "0.75em", opacity: 0.8 }}>({count})</span>
        )}
      </Badge>
    </motion.div>
  );
};
