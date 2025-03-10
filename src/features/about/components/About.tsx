import React from "react";

const About = () => {
  return (
    <section className="pb-[2rem] ">
      <h2 className=" text-primary pb-[2rem] text-[2rem] md:text-[4rem] font-medium">
        About Me
      </h2>
      <section className="border-border mb-[3rem] relative text-gray border-[1px] rounded-[15px] bg-secondaryBackgroundColor p-[1rem] md:p-[2rem]">
        <h3 className="text-primaryLight text-[1.125rem] md:text-[1.5rem] absolute -top-[1.125rem] left-[2rem] ">
          Introduction
        </h3>
        Hi, I am Babatunde Taiwo, a dedicated Engineer with a proven track
        record of delivering innovative solutions that merge technology and
        efficiency. With a Master&apos;s degree in Computer Engineering from the
        University of Essex, Colchester United Kingdom and a Bachelor&apos;s
        degree in Electrical and Electronics Engineering from Bells University
        of Technology, Ota Ogun state, Nigeria, I combine academic rigor with
        hands-on expertise to tackle complex challenges.
      </section>
      <section className="border-border mb-[3rem] relative text-gray border-[1px] rounded-[15px] bg-secondaryBackgroundColor p-[1rem] md:p-[2rem]">
        <h3 className="text-primaryLight text-[1.125rem] md:text-[1.5rem] absolute -top-[1.125rem] left-[2rem] ">
          Experience
        </h3>
        Currently, I work at Ember Snacks Limited as a contractor , optimizing
        manufacturing processes while mentoring junior team members to maximize
        performance and as a Frontend Engineer at Tiiqu Network. My previous
        roles include Chief technical officer at 16Bags Limited, Mid-Senior Web
        Developer at Ohmswich Limited, Network operation egineer at Arnergy
        Solar Limted and Siwft Networks limited where I honed my ability to
        deliver high-quality, efficient and scalable software solutions.{" "}
      </section>
      <section className="border-border mb-[3rem] relative text-gray border-[1px] rounded-[15px] bg-secondaryBackgroundColor p-[1rem] md:p-[2rem]">
        <h3 className="text-primaryLight text-[1.125rem] md:text-[1.5rem] absolute -top-[1.125rem] left-[2rem] ">
          Skills & technologies
        </h3>
        I am proficient in a broad range of technologies, including: Python,
        JavaScript, TypeScript, Rust, PHP, Django, Flask, React, Next.js,
        Vue.js, MongoDB, PostgreSQL, SQL, NoSQL, Docker, CI/CD, Redis, AWS,
        Firebase, Git, Microservices, Distributed Systems, EMG Signal
        Processing, A/B Testing
      </section>

      <section className="border-border mb-[3rem] relative text-gray border-[1px] rounded-[15px] bg-secondaryBackgroundColor p-[1rem] md:p-[2rem]">
        <h3 className="text-primaryLight text-[1.125rem] md:text-[1.5rem] absolute -top-[1.125rem] left-[2rem] ">
          Let&apos;s connect
        </h3>
        I am passionate about building software that makes a difference. Feel
        free to explore my portfolio or reach on
        <span className="mx-[0.5rem] text-primary">dev@babatundetaiwo.com</span>
        out to discuss how I can bring value to your next project!
      </section>
    </section>
  );
};

export default About;
