import React from "react";
import mitchadam from "../../assets/images/mitchadam.png";
import "./mitchadam.scss";
import { Link } from "react-router-dom";

const MitchAdam = () => {
  return (
    <div className="mitchadam-wrapper">
      <div className="container">
        <div className="row">
          <div className="col-lg-7">
            <div className="mitchadam-head" data-aos="flip-left" data-aos-duration="1000">
              <h4>WHAT'S NEW</h4>
              <h2>Mitch Adams Series</h2>
            </div>
            <div className="mitchadam-img" data-aos="flip-bottom" data-aos-duration="1000">
              <img src={mitchadam} alt="mitchadam" className="float" />
            </div>
          </div>
          <div className="col-lg-5" data-aos="flip-right" data-aos-duration="1000">
            <div className="mitchadam-content">
              <p>
                Mitchell Adams, a confident Ph.D. social worker in St. Louis,
                has his life shattered when his girlfriend is murdered, and he
                becomes the prime suspect. Threatened by the real killer, who
                poses as a client, Mitch navigates a maze of suspects from his
                practice. Racing against time, he must confront his past and
                choose between seeking truth or preserving a cherished memory.
                Scott L. Miller interrogation book is the first of the Mitch
                Adams series.
              </p>
              <p>
                The last person Mitch Adams wants to hear from is Detective JoJo
                Baker, with whom he shares a complicated history. Baker asks
                Mitch to counsel Lonnie Washington, a disabled African-American
                accused of serious crimes. Despite evidence pointing to Lonnie’s
                guilt, Baker believes there’s more to the case. Reluctantly,
                Mitch agrees, uncovering a dangerous web of corruption involving
                a powerful prosecutor and counterfeit money. Mitch fights for
                justice, risking his life to expose the truth.
              </p>
              <p>
                Mitch Adams is called to aid his mentor, psychologist Tony
                Martin, whose obsession with a Virtual Reality suicide
                prevention machine leads to trouble. Tony’s creation is stolen,
                and Mitch suspects Tony’s colleague, Danielle Naila. As bodies
                pile up before a papal visit, Mitch races to stop a global
                catastrophe. Fusing thriller, crime, and detective genres, the
                novel explores VR, neuroscience, and social issues set in
                contemporary St. Louis. THE VIRTUAL SUICIDE MACHINE, author by
                Scott L. Miller, is part of the Mitch Adams series.
              </p>
              <div className="btn-wrap">
                <Link to="/books" className="btn">
                  Get Your Copy Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MitchAdam;
