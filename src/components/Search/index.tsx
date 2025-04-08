import { useContext } from "react";
import { SearchContext } from "../../providers/SearchContext";
import { ISearch } from "../../types/Search";
import styles from "./Search.module.scss";

const Search = ({ placeholder }: ISearch) => {
  const { searchTerm, setSearchTerm } = useContext(SearchContext);

  return (
    <div className={styles.SearchParent}>
      <input className={styles.SearchInput} type="text" placeholder={placeholder} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <svg className={styles.SearchIcon} width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.2789 14.1461L7.86473 9.42112C7.5144 9.72112 7.11152 9.95862 6.65609 10.1336C6.20066 10.3086 5.71604 10.3961 5.20223 10.3961C3.92936 10.3961 2.85222 9.92437 1.97079 8.98087C1.0889 8.03687 0.647949 6.88362 0.647949 5.52112C0.647949 4.15862 1.0889 3.00537 1.97079 2.06137C2.85222 1.11787 3.92936 0.646118 5.20223 0.646118C6.47509 0.646118 7.55247 1.11787 8.43436 2.06137C9.31579 3.00537 9.7565 4.15862 9.7565 5.52112C9.7565 6.07112 9.67476 6.58987 9.51127 7.07737C9.34778 7.56487 9.12591 7.99612 8.84565 8.37112L13.2598 13.0961L12.2789 14.1461ZM5.20223 8.89612C6.07805 8.89612 6.82261 8.56812 7.43592 7.91212C8.04876 7.25562 8.35519 6.45862 8.35519 5.52112C8.35519 4.58362 8.04876 3.78662 7.43592 3.13012C6.82261 2.47412 6.07805 2.14612 5.20223 2.14612C4.3264 2.14612 3.58184 2.47412 2.96853 3.13012C2.35569 3.78662 2.04927 4.58362 2.04927 5.52112C2.04927 6.45862 2.35569 7.25562 2.96853 7.91212C3.58184 8.56812 4.3264 8.89612 5.20223 8.89612Z" fill="#9E9E9E"/>
      </svg>
    </div>
  );
};

export default Search;
