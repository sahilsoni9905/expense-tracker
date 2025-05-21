import React from 'react';
import { ArrowUpRight as LucideArrowUpRight } from 'lucide-react';

const ArrowUpRight: React.FC<{ size?: number; className?: string }> = (props) => {
  return <LucideArrowUpRight {...props} />;
};

export default ArrowUpRight;