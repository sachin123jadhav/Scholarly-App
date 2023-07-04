const Td = ({ children }) => (
  <td className="px-2 py-3 text-xs text-left border-t border-n-3 dark:border-n-5/50 md:text-xs">
    {children}
  </td>
);

const Th = ({ children, width }) => (
  <th
    className={`px-2 py-3 font-semibold tracking-wide  text-left  dark:text-n-2 text-n-6 base1 md:base2 ${width} `}
  >
    {children}
  </th>
);

export { Td, Th };
