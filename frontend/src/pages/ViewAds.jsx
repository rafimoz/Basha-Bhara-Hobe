import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom'

const ViewAds = () => {
  const { ownerId } = useParams();
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const [ads, setAds] = useState([]);
  const [visibleAds, setVisibleAds] = useState({});
  const [selectedImages, setSelectedImages] = useState({});
  const navigate = useNavigate()
  

  useEffect(() => {
    axios.get(backendURL + `/api/ads/${ownerId}`).then((res) => {
      setAds(res.data);
    });
  }, [ownerId]);

  const toggleVisibility = (adId) => {
    setVisibleAds((prev) => ({ ...prev, [adId]: !prev[adId] }));
  };

  const handleThumbnailClick = (adId, image) => {
    setSelectedImages((prev) => ({ ...prev, [adId]: image }));
  };

  return (
    <div>
      <header className="bg-white shadow-sm py-4 px-6 flex justify-start gap-3 items-center sticky top-0 z-10">
        <div onClick={()=>{navigate("/")}} className="w-7 h-7 shadow-xs rounded-full cursor-pointer">
          <svg viewBox="0 0 662 662" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_58_3)">
              <rect width="662" height="662" rx="331" fill="white" />
              <g filter="url(#filter0_f_58_3)">
                <circle cx="164.5" cy="594.5" r="263.5" fill="#FFCDCE" fill-opacity="0.82" />
              </g>
              <g filter="url(#filter1_f_58_3)">
                <circle cx="554.5" cy="20.5" r="263.5" fill="#FFFB8E" fill-opacity="0.78" />
              </g>
              <path d="M463.997 189.793L461.006 448H365.662V135.348L463.997 189.793Z" fill="url(#paint0_linear_58_3)" stroke="url(#paint1_linear_58_3)" />
              <path d="M266 189.869V280.869V450.869H463V189.869L364.5 133L266 189.869Z" stroke="url(#paint2_linear_58_3)" stroke-width="8" stroke-linejoin="round" />
              <path d="M364.5 133.369V449.869" stroke="url(#paint3_linear_58_3)" stroke-width="8" stroke-linejoin="round" />
              <path d="M331 151.869L331 449.869" stroke="url(#paint4_linear_58_3)" stroke-width="8" stroke-linejoin="round" />
              <path d="M301 168.869L301 449.869" stroke="url(#paint5_linear_58_3)" stroke-width="8" stroke-linejoin="round" />
              <rect x="406.5" y="188.369" width="16" height="26" rx="2.5" fill="white" stroke="url(#paint6_linear_58_3)" />
              <rect x="406.5" y="242.369" width="16" height="26" rx="2.5" fill="white" stroke="url(#paint7_linear_58_3)" />
              <rect x="406.5" y="296.369" width="16" height="26" rx="2.5" fill="white" stroke="url(#paint8_linear_58_3)" />
              <rect x="406.5" y="350.369" width="16" height="26" rx="2.5" fill="white" stroke="url(#paint9_linear_58_3)" />
              <rect x="406.5" y="404.369" width="16" height="26" rx="2.5" fill="white" stroke="url(#paint10_linear_58_3)" />
              <rect x="199.5" y="304.5" width="147" height="147" rx="16.5" fill="white" stroke="url(#paint11_linear_58_3)" stroke-width="7" />
              <path d="M269.646 367.083C272.472 367.083 275.297 367.083 278.208 367.083C278.208 369.909 278.208 372.735 278.208 375.646C281.034 375.646 283.86 375.646 286.771 375.646C286.771 381.297 286.771 386.948 286.771 392.771C289.597 392.771 292.422 392.771 295.333 392.771C295.333 389.945 295.333 387.12 295.333 384.208C298.159 384.208 300.985 384.208 303.896 384.208C303.896 387.034 303.896 389.86 303.896 392.771C306.722 392.771 309.547 392.771 312.458 392.771C312.458 395.596 312.458 398.422 312.458 401.333C306.807 401.333 301.156 401.333 295.333 401.333C295.333 404.159 295.333 406.985 295.333 409.896C292.508 409.896 289.682 409.896 286.771 409.896C286.771 412.722 286.771 415.547 286.771 418.458C289.597 418.458 292.422 418.458 295.333 418.458C295.333 421.284 295.333 424.11 295.333 427.021C300.985 427.021 306.636 427.021 312.458 427.021C312.458 429.847 312.458 432.672 312.458 435.583C303.982 435.583 295.505 435.583 286.771 435.583C286.771 432.758 286.771 429.932 286.771 427.021C283.945 427.021 281.12 427.021 278.208 427.021C278.208 424.195 278.208 421.37 278.208 418.458C275.383 418.458 272.557 418.458 269.646 418.458C269.646 412.807 269.646 407.156 269.646 401.333C272.472 401.333 275.297 401.333 278.208 401.333C278.208 395.682 278.208 390.031 278.208 384.208C275.383 384.208 272.557 384.208 269.646 384.208C269.646 378.557 269.646 372.906 269.646 367.083Z" fill="url(#paint12_linear_58_3)" />
              <path d="M218.271 392.771C232.399 392.771 246.527 392.771 261.083 392.771C261.083 406.899 261.083 421.027 261.083 435.583C246.955 435.583 232.827 435.583 218.271 435.583C218.271 421.455 218.271 407.327 218.271 392.771ZM226.833 401.333C226.833 409.81 226.833 418.287 226.833 427.021C235.31 427.021 243.787 427.021 252.521 427.021C252.521 418.544 252.521 410.067 252.521 401.333C244.044 401.333 235.567 401.333 226.833 401.333Z" fill="url(#paint13_linear_58_3)" />
              <path d="M286.771 324.271C300.899 324.271 315.027 324.271 329.583 324.271C329.583 338.399 329.583 352.527 329.583 367.083C315.455 367.083 301.327 367.083 286.771 367.083C286.771 352.955 286.771 338.827 286.771 324.271ZM295.333 332.833C295.333 341.31 295.333 349.787 295.333 358.521C303.81 358.521 312.287 358.521 321.021 358.521C321.021 350.044 321.021 341.567 321.021 332.833C312.544 332.833 304.067 332.833 295.333 332.833Z" fill="url(#paint14_linear_58_3)" />
              <path d="M218.271 324.271C232.399 324.271 246.527 324.271 261.083 324.271C261.083 338.399 261.083 352.527 261.083 367.083C246.955 367.083 232.827 367.083 218.271 367.083C218.271 352.955 218.271 338.827 218.271 324.271ZM226.833 332.833C226.833 341.31 226.833 349.787 226.833 358.521C235.31 358.521 243.787 358.521 252.521 358.521C252.521 350.044 252.521 341.567 252.521 332.833C244.044 332.833 235.567 332.833 226.833 332.833Z" fill="url(#paint15_linear_58_3)" />
              <path d="M303.896 375.646C312.373 375.646 320.85 375.646 329.583 375.646C329.583 378.471 329.583 381.297 329.583 384.208C326.758 384.208 323.932 384.208 321.021 384.208C321.021 387.034 321.021 389.86 321.021 392.771C318.195 392.771 315.37 392.771 312.458 392.771C312.458 389.945 312.458 387.12 312.458 384.208C309.633 384.208 306.807 384.208 303.896 384.208C303.896 381.383 303.896 378.557 303.896 375.646Z" fill="url(#paint16_linear_58_3)" />
              <path d="M218.271 375.646C226.748 375.646 235.225 375.646 243.958 375.646C243.958 378.471 243.958 381.297 243.958 384.208C235.482 384.208 227.005 384.208 218.271 384.208C218.271 381.383 218.271 378.557 218.271 375.646Z" fill="url(#paint17_linear_58_3)" />
              <path d="M232.542 407.042C237.251 407.042 241.96 407.042 246.812 407.042C246.812 411.751 246.812 416.46 246.812 421.312C242.103 421.312 237.394 421.312 232.542 421.312C232.542 416.603 232.542 411.894 232.542 407.042Z" fill="url(#paint18_linear_58_3)" />
              <path d="M301.042 338.542C305.751 338.542 310.46 338.542 315.312 338.542C315.312 343.251 315.312 347.96 315.312 352.812C310.603 352.812 305.894 352.812 301.042 352.812C301.042 348.103 301.042 343.394 301.042 338.542Z" fill="url(#paint19_linear_58_3)" />
              <path d="M232.542 338.542C237.251 338.542 241.96 338.542 246.812 338.542C246.812 343.251 246.812 347.96 246.812 352.812C242.103 352.812 237.394 352.812 232.542 352.812C232.542 348.103 232.542 343.394 232.542 338.542Z" fill="url(#paint20_linear_58_3)" />
              <path d="M269.646 341.396C272.472 341.396 275.297 341.396 278.208 341.396C278.208 347.047 278.208 352.698 278.208 358.521C275.383 358.521 272.557 358.521 269.646 358.521C269.646 352.87 269.646 347.218 269.646 341.396Z" fill="url(#paint21_linear_58_3)" />
              <path d="M321.021 427.021C323.847 427.021 326.672 427.021 329.583 427.021C329.583 429.846 329.583 432.672 329.583 435.583C326.758 435.583 323.932 435.583 321.021 435.583C321.021 432.758 321.021 429.932 321.021 427.021Z" fill="url(#paint22_linear_58_3)" />
              <path d="M269.646 427.021C272.472 427.021 275.297 427.021 278.208 427.021C278.208 429.846 278.208 432.672 278.208 435.583C275.383 435.583 272.557 435.583 269.646 435.583C269.646 432.758 269.646 429.932 269.646 427.021Z" fill="url(#paint23_linear_58_3)" />
              <path d="M312.458 418.458C315.284 418.458 318.11 418.458 321.021 418.458C321.021 421.284 321.021 424.11 321.021 427.021C318.195 427.021 315.37 427.021 312.458 427.021C312.458 424.195 312.458 421.37 312.458 418.458Z" fill="url(#paint24_linear_58_3)" />
              <path d="M321.021 409.896C323.847 409.896 326.672 409.896 329.583 409.896C329.583 412.721 329.583 415.547 329.583 418.458C326.758 418.458 323.932 418.458 321.021 418.458C321.021 415.633 321.021 412.807 321.021 409.896Z" fill="url(#paint25_linear_58_3)" />
              <path d="M303.896 409.896C306.722 409.896 309.547 409.896 312.458 409.896C312.458 412.721 312.458 415.547 312.458 418.458C309.633 418.458 306.807 418.458 303.896 418.458C303.896 415.633 303.896 412.807 303.896 409.896Z" fill="url(#paint26_linear_58_3)" />
              <path d="M321.021 392.771C323.847 392.771 326.672 392.771 329.583 392.771C329.583 395.596 329.583 398.422 329.583 401.333C326.758 401.333 323.932 401.333 321.021 401.333C321.021 398.508 321.021 395.682 321.021 392.771Z" fill="url(#paint27_linear_58_3)" />
              <path d="M252.521 375.646C255.347 375.646 258.172 375.646 261.083 375.646C261.083 378.471 261.083 381.297 261.083 384.208C258.258 384.208 255.432 384.208 252.521 384.208C252.521 381.383 252.521 378.557 252.521 375.646Z" fill="url(#paint28_linear_58_3)" />
              <path d="M269.646 324.271C272.472 324.271 275.297 324.271 278.208 324.271C278.208 327.096 278.208 329.922 278.208 332.833C275.383 332.833 272.557 332.833 269.646 332.833C269.646 330.008 269.646 327.182 269.646 324.271Z" fill="url(#paint29_linear_58_3)" />
              <path d="M163.908 520V493.54H170.64C172.8 493.54 174.504 493.756 175.752 494.188C177.024 494.62 177.96 495.172 178.56 495.844C179.184 496.516 179.592 497.224 179.784 497.968C179.976 498.712 180.072 499.408 180.072 500.056C180.072 500.752 179.964 501.484 179.748 502.252C179.556 502.996 179.22 503.692 178.74 504.34C178.26 504.964 177.6 505.468 176.76 505.852C178.56 506.308 179.832 507.1 180.576 508.228C181.344 509.332 181.728 510.568 181.728 511.936C181.728 512.872 181.62 513.82 181.404 514.78C181.188 515.74 180.732 516.616 180.036 517.408C179.364 518.176 178.344 518.8 176.976 519.28C175.608 519.76 173.772 520 171.468 520H163.908ZM167.868 504.772H171.288C172.536 504.772 173.496 504.568 174.168 504.16C174.84 503.728 175.308 503.176 175.572 502.504C175.86 501.832 176.004 501.124 176.004 500.38C176.004 499.756 175.86 499.192 175.572 498.688C175.308 498.16 174.816 497.74 174.096 497.428C173.4 497.116 172.404 496.96 171.108 496.96H167.868V504.772ZM167.868 516.616H172.008C173.232 516.616 174.204 516.472 174.924 516.184C175.668 515.896 176.232 515.524 176.616 515.068C177 514.612 177.252 514.12 177.372 513.592C177.492 513.04 177.552 512.5 177.552 511.972C177.552 510.724 177.132 509.752 176.292 509.056C175.452 508.336 174.132 507.976 172.332 507.976H167.868V516.616ZM195.028 493.504H195.424L208.168 520H203.524L201.256 514.816H189.124L186.856 520H182.356L195.028 493.504ZM195.208 501.172L193.624 504.772L190.744 511.18H199.672L196.828 504.808L195.28 501.172H195.208ZM216.468 520.36C215.46 520.36 214.464 520.24 213.48 520C212.496 519.736 211.62 519.424 210.852 519.064C210.084 518.68 209.508 518.296 209.124 517.912L211.032 514.492C211.296 514.708 211.704 514.996 212.256 515.356C212.832 515.692 213.492 515.992 214.236 516.256C214.98 516.52 215.724 516.652 216.468 516.652C217.692 516.652 218.712 516.364 219.528 515.788C220.368 515.212 220.788 514.372 220.788 513.268C220.788 512.356 220.548 511.6 220.068 511C219.588 510.4 218.952 509.872 218.16 509.416C217.392 508.96 216.552 508.528 215.64 508.12C214.752 507.688 213.9 507.208 213.084 506.68C212.148 506.056 211.332 505.228 210.636 504.196C209.94 503.164 209.592 501.832 209.592 500.2C209.592 498.592 209.952 497.272 210.672 496.24C211.416 495.208 212.388 494.44 213.588 493.936C214.812 493.408 216.144 493.144 217.584 493.144C218.736 493.144 219.72 493.264 220.536 493.504C221.352 493.744 222.036 494.032 222.588 494.368C223.14 494.704 223.572 495.004 223.884 495.268L221.976 498.544C221.568 498.112 220.956 497.716 220.14 497.356C219.324 496.972 218.412 496.78 217.404 496.78C216.228 496.78 215.292 497.056 214.596 497.608C213.9 498.136 213.552 498.928 213.552 499.984C213.552 500.92 213.864 501.724 214.488 502.396C215.112 503.044 215.904 503.644 216.864 504.196C217.848 504.724 218.856 505.264 219.888 505.816C220.92 506.368 221.832 507.016 222.624 507.76C223.272 508.336 223.824 509.056 224.28 509.92C224.736 510.784 224.964 511.756 224.964 512.836C224.964 514.468 224.58 515.848 223.812 516.976C223.068 518.104 222.06 518.956 220.788 519.532C219.516 520.084 218.076 520.36 216.468 520.36ZM229.262 520V493.54H233.294V504.34H242.618V493.54H246.65V520H242.618V507.724H233.294V520H229.262ZM261.367 493.504H261.763L274.507 520H269.863L267.595 514.816H255.463L253.195 520H248.695L261.367 493.504ZM261.547 501.172L259.963 504.772L257.083 511.18H266.011L263.167 504.808L261.619 501.172H261.547ZM285.548 520V493.54H292.28C294.44 493.54 296.144 493.756 297.392 494.188C298.664 494.62 299.6 495.172 300.2 495.844C300.824 496.516 301.232 497.224 301.424 497.968C301.616 498.712 301.712 499.408 301.712 500.056C301.712 500.752 301.604 501.484 301.388 502.252C301.196 502.996 300.86 503.692 300.38 504.34C299.9 504.964 299.24 505.468 298.4 505.852C300.2 506.308 301.472 507.1 302.216 508.228C302.984 509.332 303.368 510.568 303.368 511.936C303.368 512.872 303.26 513.82 303.044 514.78C302.828 515.74 302.372 516.616 301.676 517.408C301.004 518.176 299.984 518.8 298.616 519.28C297.248 519.76 295.412 520 293.108 520H285.548ZM289.508 504.772H292.928C294.176 504.772 295.136 504.568 295.808 504.16C296.48 503.728 296.948 503.176 297.212 502.504C297.5 501.832 297.644 501.124 297.644 500.38C297.644 499.756 297.5 499.192 297.212 498.688C296.948 498.16 296.456 497.74 295.736 497.428C295.04 497.116 294.044 496.96 292.748 496.96H289.508V504.772ZM289.508 516.616H293.648C294.872 516.616 295.844 516.472 296.564 516.184C297.308 515.896 297.872 515.524 298.256 515.068C298.64 514.612 298.892 514.12 299.012 513.592C299.132 513.04 299.192 512.5 299.192 511.972C299.192 510.724 298.772 509.752 297.932 509.056C297.092 508.336 295.772 507.976 293.972 507.976H289.508V516.616ZM307.942 520V493.54H311.974V504.34H321.298V493.54H325.33V520H321.298V507.724H311.974V520H307.942ZM340.047 493.504H340.443L353.187 520H348.543L346.275 514.816H334.143L331.875 520H327.375L340.047 493.504ZM340.227 501.172L338.643 504.772L335.763 511.18H344.691L341.847 504.808L340.299 501.172H340.227ZM355.263 520V493.54H361.275C362.619 493.54 363.915 493.672 365.163 493.936C366.435 494.2 367.563 494.644 368.547 495.268C369.531 495.892 370.311 496.72 370.887 497.752C371.463 498.784 371.751 500.056 371.751 501.568C371.751 503.32 371.343 504.844 370.527 506.14C369.711 507.436 368.475 508.432 366.819 509.128L373.119 520H368.475L363.147 509.992C362.739 510.016 362.235 510.04 361.635 510.064C361.059 510.064 360.579 510.064 360.195 510.064H359.187V520H355.263ZM359.187 506.788H361.743C363.063 506.788 364.119 506.62 364.911 506.284C365.727 505.948 366.351 505.528 366.783 505.024C367.215 504.496 367.503 503.932 367.647 503.332C367.815 502.708 367.899 502.132 367.899 501.604C367.899 500.428 367.623 499.504 367.071 498.832C366.543 498.136 365.799 497.644 364.839 497.356C363.903 497.044 362.823 496.888 361.599 496.888H359.187V506.788ZM386.7 493.504H387.096L399.84 520H395.196L392.928 514.816H380.796L378.528 520H374.028L386.7 493.504ZM386.88 501.172L385.296 504.772L382.416 511.18H391.344L388.5 504.808L386.952 501.172H386.88ZM410.844 520V493.54H414.876V504.34H424.2V493.54H428.232V520H424.2V507.724H414.876V520H410.844ZM445.83 520.36C444.03 520.36 442.326 520.048 440.718 519.424C439.134 518.8 437.73 517.9 436.506 516.724C435.282 515.524 434.31 514.084 433.59 512.404C432.894 510.724 432.546 508.828 432.546 506.716C432.546 504.58 432.894 502.672 433.59 500.992C434.31 499.312 435.282 497.884 436.506 496.708C437.754 495.532 439.17 494.644 440.754 494.044C442.362 493.42 444.054 493.108 445.83 493.108C447.606 493.108 449.286 493.42 450.87 494.044C452.478 494.644 453.894 495.532 455.118 496.708C456.366 497.884 457.338 499.312 458.034 500.992C458.754 502.672 459.114 504.58 459.114 506.716C459.114 508.828 458.754 510.724 458.034 512.404C457.338 514.084 456.378 515.524 455.154 516.724C453.93 517.9 452.514 518.8 450.906 519.424C449.322 520.048 447.63 520.36 445.83 520.36ZM445.83 516.724C447.462 516.724 448.962 516.34 450.33 515.572C451.698 514.804 452.79 513.688 453.606 512.224C454.422 510.736 454.83 508.912 454.83 506.752C454.83 504.568 454.422 502.744 453.606 501.28C452.79 499.792 451.698 498.676 450.33 497.932C448.986 497.164 447.486 496.78 445.83 496.78C444.174 496.78 442.662 497.164 441.294 497.932C439.95 498.676 438.87 499.792 438.054 501.28C437.238 502.744 436.83 504.568 436.83 506.752C436.83 508.912 437.25 510.736 438.09 512.224C438.93 513.688 440.034 514.804 441.402 515.572C442.77 516.34 444.246 516.724 445.83 516.724ZM463.474 520V493.54H470.206C472.366 493.54 474.07 493.756 475.318 494.188C476.59 494.62 477.526 495.172 478.126 495.844C478.75 496.516 479.158 497.224 479.35 497.968C479.542 498.712 479.638 499.408 479.638 500.056C479.638 500.752 479.53 501.484 479.314 502.252C479.122 502.996 478.786 503.692 478.306 504.34C477.826 504.964 477.166 505.468 476.326 505.852C478.126 506.308 479.398 507.1 480.142 508.228C480.91 509.332 481.294 510.568 481.294 511.936C481.294 512.872 481.186 513.82 480.97 514.78C480.754 515.74 480.298 516.616 479.602 517.408C478.93 518.176 477.91 518.8 476.542 519.28C475.174 519.76 473.338 520 471.034 520H463.474ZM467.434 504.772H470.854C472.102 504.772 473.062 504.568 473.734 504.16C474.406 503.728 474.874 503.176 475.138 502.504C475.426 501.832 475.57 501.124 475.57 500.38C475.57 499.756 475.426 499.192 475.138 498.688C474.874 498.16 474.382 497.74 473.662 497.428C472.966 497.116 471.97 496.96 470.674 496.96H467.434V504.772ZM467.434 516.616H471.574C472.798 516.616 473.77 516.472 474.49 516.184C475.234 515.896 475.798 515.524 476.182 515.068C476.566 514.612 476.818 514.12 476.938 513.592C477.058 513.04 477.118 512.5 477.118 511.972C477.118 510.724 476.698 509.752 475.858 509.056C475.018 508.336 473.698 507.976 471.898 507.976H467.434V516.616ZM485.868 520V493.54H497.46V497.068H489.864V504.376H495.984V507.976H489.864V516.436H498.648V520H485.868Z" fill="url(#paint30_linear_58_3)" />
            </g>
            <defs>
              <filter id="filter0_f_58_3" x="-249" y="181" width="827" height="827" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="75" result="effect1_foregroundBlur_58_3" />
              </filter>
              <filter id="filter1_f_58_3" x="141" y="-393" width="827" height="827" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="75" result="effect1_foregroundBlur_58_3" />
              </filter>
              <linearGradient id="paint0_linear_58_3" x1="414.831" y1="134.5" x2="414.831" y2="448.5" gradientUnits="userSpaceOnUse">
                <stop stop-color="#8D8D8D" />
                <stop offset="1" stop-color="#590013" />
              </linearGradient>
              <linearGradient id="paint1_linear_58_3" x1="414.831" y1="134.5" x2="414.831" y2="448.5" gradientUnits="userSpaceOnUse">
                <stop stop-color="#8D8D8D" />
                <stop offset="1" stop-color="#590013" />
              </linearGradient>
              <linearGradient id="paint2_linear_58_3" x1="364.5" y1="133" x2="364.5" y2="450.869" gradientUnits="userSpaceOnUse">
                <stop stop-color="#8D8D8D" />
                <stop offset="1" stop-color="#590013" />
              </linearGradient>
              <linearGradient id="paint3_linear_58_3" x1="365" y1="133.369" x2="365" y2="449.869" gradientUnits="userSpaceOnUse">
                <stop stop-color="#8D8D8D" />
                <stop offset="1" stop-color="#590013" />
              </linearGradient>
              <linearGradient id="paint4_linear_58_3" x1="331.5" y1="151.869" x2="331.5" y2="449.869" gradientUnits="userSpaceOnUse">
                <stop stop-color="#8D8D8D" />
                <stop offset="1" stop-color="#590013" />
              </linearGradient>
              <linearGradient id="paint5_linear_58_3" x1="301.5" y1="168.869" x2="301.5" y2="449.869" gradientUnits="userSpaceOnUse">
                <stop stop-color="#8D8D8D" />
                <stop offset="1" stop-color="#590013" />
              </linearGradient>
              <linearGradient id="paint6_linear_58_3" x1="414.5" y1="187.869" x2="414.5" y2="214.869" gradientUnits="userSpaceOnUse">
                <stop stop-color="#8D8D8D" />
                <stop offset="1" stop-color="#590013" />
              </linearGradient>
              <linearGradient id="paint7_linear_58_3" x1="414.5" y1="241.869" x2="414.5" y2="268.869" gradientUnits="userSpaceOnUse">
                <stop stop-color="#8D8D8D" />
                <stop offset="1" stop-color="#590013" />
              </linearGradient>
              <linearGradient id="paint8_linear_58_3" x1="414.5" y1="295.869" x2="414.5" y2="322.869" gradientUnits="userSpaceOnUse">
                <stop stop-color="#8D8D8D" />
                <stop offset="1" stop-color="#590013" />
              </linearGradient>
              <linearGradient id="paint9_linear_58_3" x1="414.5" y1="349.869" x2="414.5" y2="376.869" gradientUnits="userSpaceOnUse">
                <stop stop-color="#8D8D8D" />
                <stop offset="1" stop-color="#590013" />
              </linearGradient>
              <linearGradient id="paint10_linear_58_3" x1="414.5" y1="403.869" x2="414.5" y2="430.869" gradientUnits="userSpaceOnUse">
                <stop stop-color="#8D8D8D" />
                <stop offset="1" stop-color="#590013" />
              </linearGradient>
              <linearGradient id="paint11_linear_58_3" x1="273" y1="301" x2="273" y2="455" gradientUnits="userSpaceOnUse">
                <stop stop-color="#8D8D8D" />
                <stop offset="1" stop-color="#590013" />
              </linearGradient>
              <linearGradient id="paint12_linear_58_3" x1="291.052" y1="367.083" x2="291.052" y2="435.583" gradientUnits="userSpaceOnUse">
                <stop stop-color="#8D8D8D" />
                <stop offset="1" stop-color="#590013" />
              </linearGradient>
              <linearGradient id="paint13_linear_58_3" x1="239.677" y1="392.771" x2="239.677" y2="435.583" gradientUnits="userSpaceOnUse">
                <stop stop-color="#8D8D8D" />
                <stop offset="1" stop-color="#590013" />
              </linearGradient>
              <linearGradient id="paint14_linear_58_3" x1="308.177" y1="324.271" x2="308.177" y2="367.083" gradientUnits="userSpaceOnUse">
                <stop stop-color="#8D8D8D" />
                <stop offset="1" stop-color="#590013" />
              </linearGradient>
              <linearGradient id="paint15_linear_58_3" x1="239.677" y1="324.271" x2="239.677" y2="367.083" gradientUnits="userSpaceOnUse">
                <stop stop-color="#8D8D8D" />
                <stop offset="1" stop-color="#590013" />
              </linearGradient>
              <linearGradient id="paint16_linear_58_3" x1="316.74" y1="375.646" x2="316.74" y2="392.771" gradientUnits="userSpaceOnUse">
                <stop stop-color="#8D8D8D" />
                <stop offset="1" stop-color="#590013" />
              </linearGradient>
              <linearGradient id="paint17_linear_58_3" x1="231.115" y1="375.646" x2="231.115" y2="384.208" gradientUnits="userSpaceOnUse">
                <stop stop-color="#8D8D8D" />
                <stop offset="1" stop-color="#590013" />
              </linearGradient>
              <linearGradient id="paint18_linear_58_3" x1="239.677" y1="407.042" x2="239.677" y2="421.312" gradientUnits="userSpaceOnUse">
                <stop stop-color="#8D8D8D" />
                <stop offset="1" stop-color="#590013" />
              </linearGradient>
              <linearGradient id="paint19_linear_58_3" x1="308.177" y1="338.542" x2="308.177" y2="352.812" gradientUnits="userSpaceOnUse">
                <stop stop-color="#8D8D8D" />
                <stop offset="1" stop-color="#590013" />
              </linearGradient>
              <linearGradient id="paint20_linear_58_3" x1="239.677" y1="338.542" x2="239.677" y2="352.812" gradientUnits="userSpaceOnUse">
                <stop stop-color="#8D8D8D" />
                <stop offset="1" stop-color="#590013" />
              </linearGradient>
              <linearGradient id="paint21_linear_58_3" x1="273.927" y1="341.396" x2="273.927" y2="358.521" gradientUnits="userSpaceOnUse">
                <stop stop-color="#8D8D8D" />
                <stop offset="1" stop-color="#590013" />
              </linearGradient>
              <linearGradient id="paint22_linear_58_3" x1="325.302" y1="427.021" x2="325.302" y2="435.583" gradientUnits="userSpaceOnUse">
                <stop stop-color="#8D8D8D" />
                <stop offset="1" stop-color="#590013" />
              </linearGradient>
              <linearGradient id="paint23_linear_58_3" x1="273.927" y1="427.021" x2="273.927" y2="435.583" gradientUnits="userSpaceOnUse">
                <stop stop-color="#8D8D8D" />
                <stop offset="1" stop-color="#590013" />
              </linearGradient>
              <linearGradient id="paint24_linear_58_3" x1="316.74" y1="418.458" x2="316.74" y2="427.021" gradientUnits="userSpaceOnUse">
                <stop stop-color="#8D8D8D" />
                <stop offset="1" stop-color="#590013" />
              </linearGradient>
              <linearGradient id="paint25_linear_58_3" x1="325.302" y1="409.896" x2="325.302" y2="418.458" gradientUnits="userSpaceOnUse">
                <stop stop-color="#8D8D8D" />
                <stop offset="1" stop-color="#590013" />
              </linearGradient>
              <linearGradient id="paint26_linear_58_3" x1="308.177" y1="409.896" x2="308.177" y2="418.458" gradientUnits="userSpaceOnUse">
                <stop stop-color="#8D8D8D" />
                <stop offset="1" stop-color="#590013" />
              </linearGradient>
              <linearGradient id="paint27_linear_58_3" x1="325.302" y1="392.771" x2="325.302" y2="401.333" gradientUnits="userSpaceOnUse">
                <stop stop-color="#8D8D8D" />
                <stop offset="1" stop-color="#590013" />
              </linearGradient>
              <linearGradient id="paint28_linear_58_3" x1="256.802" y1="375.646" x2="256.802" y2="384.208" gradientUnits="userSpaceOnUse">
                <stop stop-color="#8D8D8D" />
                <stop offset="1" stop-color="#590013" />
              </linearGradient>
              <linearGradient id="paint29_linear_58_3" x1="273.927" y1="324.271" x2="273.927" y2="332.833" gradientUnits="userSpaceOnUse">
                <stop stop-color="#8D8D8D" />
                <stop offset="1" stop-color="#590013" />
              </linearGradient>
              <linearGradient id="paint30_linear_58_3" x1="322.5" y1="494" x2="322.5" y2="520" gradientUnits="userSpaceOnUse">
                <stop stop-color="#660002" />
                <stop offset="1" stop-color="#A8A8A8" />
              </linearGradient>
              <clipPath id="clip0_58_3">
                <rect width="662" height="662" rx="331" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <h1 className="sm:text-2xl text-xl font-semibold text-gray-900 cursor-pointer">Basha Bhara Hobe</h1>
      </header>
      <div className="p-6 space-y-3">
        <h1 className="sm:text-6xl text-5xl font-bold sm:mb-10 mt-5 mb-10">Available Units</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ads.map((ad) => {
            const isVisible = visibleAds[ad._id] || false;
            const selectedImg = selectedImages[ad._id] || "";

            return (
              ad.availability && (
                <div key={ad._id} className="bg-black text-white h-fit rounded-xl overflow-hidden shadow-xl relative transition-all duration-300">
                  <div className="relative" onClick={() => toggleVisibility(ad._id)}>
                    <div className="flex overflow-x-scroll no-scrollbar sm:h-60 h-70">
                      {ad.images.map((image, index) => (
                        <img
                          key={index}
                          src={selectedImg || image}
                          alt={`Ad image ${index + 1}`}
                          className="h-full w-full object-cover flex-shrink-0 cursor-pointer transition-transform duration-300 hover:scale-105"
                        />
                      ))}
                    </div>

                    {/* Dots */}
                    <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
                      {ad.images.map((_, index) => (
                        <span
                          key={index}
                          className="w-3 h-3 bg-white rounded-full border border-gray-300"
                        />
                      ))}
                    </div>
                  </div>
                  {/* Thumbnails with smooth fade */}
                  {isVisible && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="flex items-center gap-2 px-4 pt-4"
                    >
                      {ad.images.slice(0, 3).map((img, index) => (
                        <div
                          key={index}
                          className="w-12 h-12 rounded-xl overflow-hidden hover:border cursor-pointer"
                          onClick={() => handleThumbnailClick(ad._id, img)}
                        >
                          <img src={img} alt={`thumb-${index}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </motion.div>
                  )}
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <h2 className="sm:text-3xl text-2xl font-bold mb-1">{ad.title}</h2>
                      <div
                        className="text-white w-15 h-15 flex justify-center items-center rounded-full font-bold sm:text-xs text-sm"
                        style={{
                          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 53 53'><path d='M26.5 0L30.6682 4.20224L36.0729 1.78949L38.4416 7.21367L44.3529 6.91626L44.6022 12.8298L50.2218 14.6879L48.3181 20.2922L52.887 24.0549L49.0872 28.593L51.9884 33.7521L46.8059 36.6111L47.6475 42.4698L41.7821 43.2637L40.4505 49.0308L34.6944 47.6522L31.3694 52.5488L26.5 49.184L21.6306 52.5488L18.3056 47.6522L12.5495 49.0308L11.2179 43.2637L5.35254 42.4698L6.19412 36.6111L1.01162 33.7521L3.91277 28.593L0.113045 24.0549L4.68195 20.2922L2.77817 14.6879L8.39778 12.8298L8.64707 6.91626L14.5584 7.21367L16.9271 1.78949L22.3318 4.20224L26.5 0Z' fill='%23F34141'/></svg>")`,
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                        }}
                      >
                        <p>৳ {ad.price}</p>
                      </div>
                    </div>

                    <p className={`text-white mb-4 text-sm mt-2 ${!isVisible ? "truncate" : ""}`}>
                      {ad.description}
                    </p>

                    {isVisible && (
                      <>
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.25 }}
                        >
                          Move-in: <span className="font-semibold">{new Date(ad.moveInDate).toDateString()}</span>
                        </motion.p>
                        <motion.button
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.25 }}
                          className="text-green-600 bg-white w-full mt-3 py-2 rounded-3xl hover:bg-green-600 hover:text-white transition"
                        >
                          Contact
                        </motion.button>
                      </>
                    )}
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </div>

  );
};

export default ViewAds;