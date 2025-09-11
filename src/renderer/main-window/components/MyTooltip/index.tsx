import React from 'react';
import { Tooltip, TooltipProps } from '@chakra-ui/react';

interface Props extends TooltipProps {
  forceShow?: boolean;
}

const MyTooltip = ({
  children,
  shouldWrapChildren = true,
  ...props
}: Props) => {
  return (
    <Tooltip
      className="tooltip"
      bg={'myBackground.100'}
      arrowShadowColor={' rgba(0,0,0,0.05)'}
      hasArrow
      arrowSize={12}
      offset={[-15, 15]}
      color={'myText.500'}
      px={4}
      py={2}
      borderRadius={'8px'}
      whiteSpace={'pre-wrap'}
      boxShadow={'1px 1px 10px rgba(0,0,0,0.2)'}
      shouldWrapChildren={shouldWrapChildren}
      {...props}
    >
      {children}
    </Tooltip>
  );
};

export default MyTooltip;
