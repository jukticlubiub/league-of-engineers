import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface MobileItemProps {
  label: string;
  active?: boolean;
  href: string;
  onClick?: () => void;
}

const MobileItem: React.FC<MobileItemProps> = ({ label, active, href, onClick }) => {
  return (
    <Link
    onClick={onClick}
      href={href}
      className={twMerge(
        `
        flex
        flex-col
        items-center
        hover:text-white
        py-2
        mb-10
        `,
        active && "text-white font-bold"
      )}
    >
      <div className="truncate text-white w-100">
        <p>{label}</p>
      </div>
    </Link>
  );
};

export default MobileItem;
