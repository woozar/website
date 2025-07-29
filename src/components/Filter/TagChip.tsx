import { Badge, type BadgeProps } from '@mantine/core';
import { motion, Variants } from 'framer-motion';

interface TagChipProps extends Omit<BadgeProps, 'onClick'> {
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
    tap: { scale: 0.95 }
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
        variant={isSelected ? 'filled' : 'outline'}
        color={isPrimary ? 'red' : 'orange'}
        style={{
          cursor: onClick ? 'pointer' : 'default',
          // backgroundColor: isSelected 
          //   ? isPrimary 
          //     ? 'var(--primary-orange)' 
          //     : 'var(--primary-red)'
          //   : isPrimary
          //     ? 'rgba(255, 107, 53, 0.15)'
          //     : 'transparent',
          // borderColor: isPrimary ? 'var(--primary-orange)' : '#e0e0e0',
          // color: isSelected 
          //   ? 'white' 
          //   : isPrimary 
          //     ? 'var(--primary-orange)' 
          //     : 'var(--text-secondary)',
          // fontWeight: isPrimary ? 600 : 500,
          // display: 'inline-flex',
          // alignItems: 'center',
          // gap: '0.5rem',
          // minWidth: '60px',
          // justifyContent: 'center',
          // textAlign: 'center',
          // borderWidth: '2px',
          ...props.style
        }}
        onClick={handleClick}
        {...props}
      >
        {tag}
        {count !== undefined && (
          <span style={{ fontSize: '0.75em', opacity: 0.8 }}>
            ({count})
          </span>
        )}
      </Badge>
    </motion.div>
  );
};