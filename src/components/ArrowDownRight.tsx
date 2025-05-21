import React from 'react';
import { ArrowDownRight as LucideArrowDownRight } from 'lucide-react';

const ArrowDownRight: React.FC<{ size?: number; className?: string }> = (props) => {
  return <LucideArrowDownRight {...props} />;
};

export default ArrowDownRight;