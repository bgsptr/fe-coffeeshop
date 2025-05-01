import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import aboutRight from "../assets/candra/about-right.png";
import aboutLeft from "../assets/candra/about-left.png";
import aboutMission from "../assets/candra/about-mission.png";
import aboutPractice from "../assets/candra/about-practice.png";

const About = () => {
  return (
    <div className="font-poppins flex flex-col min-h-screen">
      <Navbar />
      {/* body */}
      <div className="bg-[#B5B5B5] flex-grow">
        {/* card */}
        <div className="p-[3rem]">
          <div className="flex mb-[8rem]">
            <div className="flex flex-col gap-[1.7rem]">
              <h6 className="text-[#43527D] font-bold text-[4rem]">
                2017-till now
              </h6>
              <p className="text-[#2D3E70] font-normal text-[1.5rem]">
                "Our journey started in the vibrant streets of{" "}
                <span className="font-bold">Canggu</span>, Bali, where a group
                of coffee enthusiasts dreamed of creating a haven for coffee
                lovers."
              </p>
            </div>
            <img src={aboutRight} alt="" />
          </div>

          <div className="flex gap-7 mb-[4rem]">
            <img src={aboutLeft} alt="" />
            <div className="flex flex-col">
              <h6 className="text-[#43527D] font-bold text-xl">
                - <q>September 03 2018</q>
              </h6>
              <p className="font-normal text-[#2D3E70]">
                Our mission is to craft unforgettable moments through
                exceptional coffee and gourmet delights, all while supporting
                our local community and practicing sustainability." "We are
                committed to sustainable practices, from using locally sourced
                ingredients to reducing our environmental footprint. Our mission
                is to craft unforgettable moments through exceptional coffee and
                gourmet delights, all while supporting our local community and
                practicing sustainability
              </p>
            </div>
          </div>
        </div>

        <div className="mb-[5rem] text-white w-full relative">
          <img src={aboutPractice} alt="about-practice" className="object-cover w-full" />
          <div className="p-[3rem] flex flex-col gap-3 absolute top-0">
            <h6 className="font-semibold text-[4rem]">Sustainability Practices</h6>
            <p className="font-light w-1/2">
              "We are committed to sustainable practices, from using locally
              sourced ingredients to reducing our environmental footprint."
            </p>
          </div>
        </div>

        <div className="flex p-[3rem] gap-7">
          <div className="flex flex-col gap-[1.7rem]">
            <h6 className="font-semibold text-[5rem]">
              <span className="text-[#FFFFFF]">Our </span>
              <span className="text-[#2D3E70]">Mission & </span>
              <span className="text-[#2F8258]">Vision</span>
            </h6>
            <p className="font-normal text-[#2D3E70] text-[1.2rem]">
              "Our mission is to craft unforgettable moments through exceptional
              coffee and gourmet delights, all while supporting our local
              community and practicing sustainability." Our mission is to craft
              unforgettable moments through exceptional coffee and gourmet
              delights, all while supporting our local community and practicing
              sustainability." "We are committed to sustainable practices, from
              using locally sourced ingredients to reducing our environmental
              footprint. Our mission is to craft unforgettable moments through
              exceptional coffee and gourmet delights, all while supporting our
              local community and practicing sustainability
            </p>
          </div>
          <img src={aboutMission} alt="" />
        </div>
      </div>

      {/* body */}
      <Footer />
    </div>
  );
};

export default About;
