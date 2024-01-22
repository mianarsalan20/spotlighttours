import React from "react";
import styled from "styled-components";

export default function Services() {
  const data = [
    {
      icon: "uil uil-award",
      title: "Get Best Prices",
      subTitle:
        "Pay through our application and save thousands and get amazing rewards.",
    },
    {
      icon: "uil uil-shield-plus",
      title: "Covid Safe",
      subTitle:
        "We have all the curated hotels that have all the precaution for a covid safe environment.",
    },
    {
      icon: "uil uil-credit-card",
      title: "Flexible Payment",
      subTitle:
        " Enjoy the flexible payment through our app and get rewards on every payment.",
    },
    {
      icon: "uil uil-map-pin-alt",
      title: "Find The Best Near You",
      subTitle:
        "Find the best hotels and places to visit near you in a single click.",
    },
  ];
  return (
    <Section className="services section">
      <h1 className="section__title">Services</h1>
      <h2 className="section__subtitle">What we offer</h2>
      <div className="services__container container grid">
        {data.map((service, index) => {
          return (
            <div className="service" key={index}>
              <div className="icon">
                <i className={service.icon}></i>
              </div>
              <h3>{service.title}</h3>
              <p>{service.subTitle}</p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

const Section = styled.section`
  .section__subtitle {
    display: block;
    margin-bottom: 4rem;
  }

  .section__title,
  .section__subtitle {
    text-align: center;
  }

  .services__container {
    grid-template-columns: repeat(4, 1fr);
    align-items: center;
    column-gap: 2rem;
    row-gap: 2rem;
    margin-bottom: var(--mb-2);
  }
  .grid {
    display: grid;
    gap: 1.5rem;
  }

  .services__title {
    font-size: 1.5rem;
    font-weight: 500;
  }
  .service {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 2rem;
    background-color: aliceblue;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    transition: 0.3s ease-in-out;
    &:hover {
      transform: translateX(0.4rem) translateY(-1rem);
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }
    .icon {
      i {
        font-size: 6rem;
        color: var(--primary-color);
      }
    }
  }
  @media screen and (min-width: 280px) and (max-width: 720px) {
    .services__container {
      grid-template-columns: repeat(1, 1fr);
      column-gap: 0.5rem;
    }
  }
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    .services__container {
      grid-template-columns: repeat(2, 1fr);
      column-gap: 1rem;
    }
  }
`;
