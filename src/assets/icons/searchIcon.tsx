import {FC, SVGProps} from 'react';

const SearchIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="13"
        height="14"
        fill="none"
        viewBox="0 0 13 14"
        {...props}
    >
        <path
            fill="currentColor"
            d="M11.891 13.846 7.477 9.121a4.1 4.1 0 0 1-2.662.975q-1.91 0-3.232-1.415T.26 5.221q0-2.043 1.323-3.46Q2.906.347 4.815.347t3.232 1.416q1.322 1.416 1.322 3.46 0 .825-.245 1.556a4.6 4.6 0 0 1-.666 1.293l4.414 4.725zm-7.076-5.25q1.314 0 2.233-.984.92-.984.92-2.39t-.92-2.392q-.92-.984-2.233-.984T2.58 2.83q-.92.986-.92 2.391 0 1.407.92 2.391t2.234.984"
        ></path>
    </svg>
);

export default SearchIcon;