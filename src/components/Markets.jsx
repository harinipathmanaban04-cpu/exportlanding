import Reveal from './Reveal'
import { Coins, Container, Plane, Ship, Truck } from './icons'

import airImg from 'C:/Users/acer/.gemini/antigravity/brain/b2009b85-97ef-4039-8058-67b773f37d00/.user_uploaded/media_1791445978432.png'
import shipImg from 'C:/Users/acer/.gemini/antigravity/brain/b2009b85-97ef-4039-8058-67b773f37d00/.user_uploaded/media_1791446062654.jpg'
import truckImg from 'C:/Users/acer/.gemini/antigravity/brain/b2009b85-97ef-4039-8058-67b773f37d00/.user_uploaded/media_1791446105033.png'

export default function Markets() {
  return (
    <section id="markets">
      <div className="wrap">
        <Reveal className="sec-head" as="div">
          <h2>Quote in the buyer's currency, on the buyer's <em>terms.</em></h2>
          <p>
            Track every consignment by the mode it actually travels, across air, sea, and overland road networks.
          </p>
        </Reveal>

        {/* 3 Freight Cards with User-Uploaded High-Quality Images */}
        <Reveal className="freight-grid" as="div">
          <div className="freight-card">
            <div className="freight-img-wrap">
              <img
                src={airImg}
                alt="Air Freight - Cargo Airplane"
                className="freight-img"
              />
            </div>
            <div className="freight-badge">
              <Plane />
            </div>
            <div className="freight-body">
              <h3>Air Freight</h3>
              <p>We have a vast network of partners and carriers providing priority international air transit and automated documentation.</p>
            </div>
          </div>

          <div className="freight-card">
            <div className="freight-img-wrap">
              <img
                src={shipImg}
                alt="Ship Freight - Container Vessel"
                className="freight-img"
              />
            </div>
            <div className="freight-badge">
              <Ship />
            </div>
            <div className="freight-body">
              <h3>Ship Freight</h3>
              <p>We have a vast network of partners and carriers across all global shipping lanes with real-time container tracking.</p>
            </div>
          </div>

          <div className="freight-card">
            <div className="freight-img-wrap">
              <img
                src={truckImg}
                alt="Truck Freight - Logistics Transport"
                className="freight-img"
              />
            </div>
            <div className="freight-badge">
              <Truck />
            </div>
            <div className="freight-body">
              <h3>Truck Freight</h3>
              <p>We have a vast network of partners and carriers delivering reliable overland transport, port drayage, and cross-border fleets.</p>
            </div>
          </div>
        </Reveal>

        {/* Currency & Incoterms Trading Standards */}
        <Reveal className="trading-grid" as="div">
          <div className="trading-card">
            <h3>
              <Coins />
              Currencies
            </h3>
            <p>Price each quotation and invoice in the currency your buyer pays in.</p>
            <div className="chips">
              <span className="chip">INR</span>
              <span className="chip">USD</span>
              <span className="chip">EUR</span>
              <span className="chip">GBP</span>
              <span className="chip">AED</span>
            </div>
          </div>

          <div className="trading-card">
            <h3>
              <Container />
              Incoterms
            </h3>
            <p>Choose the delivery terms agreed with the buyer. They carry through to the invoice.</p>
            <div className="chips">
              <span className="chip">FOB</span>
              <span className="chip">CIF</span>
              <span className="chip">CFR</span>
              <span className="chip">EXW</span>
              <span className="chip">DDP</span>
              <span className="chip">CIP</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
