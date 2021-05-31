declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.svg' {
  export function ReactComponent(props: React.SVGProps<SVGSVGElement>): React.ReactElement
  const url: string
  export default url
}
declare module 'postcss-px-to-viewport';
declare module 'postcss-aspect-ratio-mini';
declare module 'postcss-write-svg';
declare module 'postcss-plugin-px2rem';


