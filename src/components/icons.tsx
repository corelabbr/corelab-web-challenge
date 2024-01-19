

export function SearchInputIcon() {
  return (
    <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.8914 13.8464L7.47727 9.12144C7.12695 9.42144 6.72407 9.65894 6.26864 9.83393C5.81321 10.0089 5.32859 10.0964 4.81477 10.0964C3.54191 10.0964 2.46477 9.62469 1.58334 8.68119C0.701445 7.73719 0.260498 6.58394 0.260498 5.22144C0.260498 3.85894 0.701445 2.70569 1.58334 1.76169C2.46477 0.818186 3.54191 0.346436 4.81477 0.346436C6.08764 0.346436 7.16501 0.818186 8.04691 1.76169C8.92834 2.70569 9.36905 3.85894 9.36905 5.22144C9.36905 5.77144 9.28731 6.29019 9.12382 6.77769C8.96033 7.26519 8.73846 7.69644 8.4582 8.07144L12.8723 12.7964L11.8914 13.8464ZM4.81477 8.59644C5.6906 8.59644 6.43516 8.26844 7.04847 7.61244C7.66131 6.95594 7.96773 6.15894 7.96773 5.22144C7.96773 4.28394 7.66131 3.48694 7.04847 2.83044C6.43516 2.17444 5.6906 1.84644 4.81477 1.84644C3.93895 1.84644 3.19439 2.17444 2.58108 2.83044C1.96823 3.48694 1.66181 4.28394 1.66181 5.22144C1.66181 6.15894 1.96823 6.95594 2.58108 7.61244C3.19439 8.26844 3.93895 8.59644 4.81477 8.59644Z" fill="#9E9E9E"/>
    </svg>
  );
}

export function FilterIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
    </svg>
  )
}

export function FavoriteStar(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#455A64" className="w-6 h-6" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
    </svg>
  );
}

export function EditContentIcon() {
  return (
    <svg viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.0725 9.63188L14.9603 10.5197L6.38473 19.0763H5.51584V18.2074L14.0725 9.63188ZM17.4725 3.96521C17.2364 3.96521 16.9908 4.05965 16.8114 4.2391L15.0831 5.96743L18.6247 9.5091L20.3531 7.78077C20.7214 7.41243 20.7214 6.79854 20.3531 6.4491L18.1431 4.2391C17.9542 4.05021 17.7181 3.96521 17.4725 3.96521ZM14.0725 6.97799L3.62695 17.4235V20.9652H7.16862L17.6142 10.5197L14.0725 6.97799Z" fill="#51646E"/>
    </svg>
  );
}

export function EditColorIcon() {
  return (
    <svg viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.6238 12.012C16.6238 12.012 14.6238 14.182 14.6238 15.512C14.6238 16.0424 14.8346 16.5511 15.2096 16.9262C15.5847 17.3012 16.0934 17.512 16.6238 17.512C17.1543 17.512 17.663 17.3012 18.0381 16.9262C18.4131 16.5511 18.6238 16.0424 18.6238 15.512C18.6238 14.182 16.6238 12.012 16.6238 12.012ZM2.83384 10.512L7.62384 5.72196L12.4138 10.512M14.1838 9.45196L5.24384 0.511963L3.83384 1.92196L6.21384 4.30196L1.06384 9.45196C0.473838 10.012 0.473838 10.982 1.06384 11.572L6.56384 17.072C6.85384 17.362 7.24384 17.512 7.62384 17.512C8.00384 17.512 8.39384 17.362 8.68384 17.072L14.1838 11.572C14.7738 10.982 14.7738 10.012 14.1838 9.45196Z" fill="#51646E"/>
      <path d="M7.69279 15.5089L2.86279 10.4651H12.4302L7.69279 15.5089Z" fill="#FFA000"/>
    </svg>
  );
}

export function DeleteIcon() {
  return (
    <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" >
      <path d="M13.7428 1.76442L12.4191 0.440796L7.17155 5.68837L1.92397 0.440796L0.600342 1.76442L5.84792 7.012L0.600342 12.2596L1.92397 13.5832L7.17155 8.33563L12.4191 13.5832L13.7428 12.2596L8.49517 7.012L13.7428 1.76442Z" fill="#51646E"/>
    </svg>
  );
}
