import React from "react";
import Socialfollow from "./blog/socialfollow";
import Trending from "./blog/trending";

const Terms = () => {
  return (
    <div style={{ padding: "1rem 15px" }} class="container-fluid ">
      <div style={{ padding: "0" }} class="container">
        <div class="row">
          <div class="col-lg-8">
            <div
              className="bg-light py-3 px-4 mb-3"
              style={{ textAlign: "center" }}
            >
              <h3 className="mb4">Terms And Conditions</h3>
            </div>
            <div className="bg-light py-5 px-4 mb-3">
              <p>
                By accessing or using OffTheWeb blog website, you agree to be
                bound by the following terms and conditions. If you do not agree
                to these terms and conditions, please do not use this website.
              </p>

              <p>
                <b>1. Use of Content: </b>All content provided on OffTheWeb blog
                website is for informational purposes only. The website and its
                content are protected by copyright and other laws. You may not
                copy, reproduce, distribute, or use any content from this
                website without obtaining prior written permission from
                OffTheWeb.
              </p>
              <p>
                <b>2. User-Generated Content: </b>Users of OffTheWeb may be
                allowed to submit comments, posts, or other content to the
                website. By submitting such content, you grant OffTheWeb a
                non-exclusive, royalty-free, perpetual, irrevocable, and fully
                sublicensable right to use, reproduce, modify, adapt, publish,
                translate, create derivative works from, distribute, and display
                such content throughout the world in any media.
              </p>
              <p>
                <b>3. Prohibited Content: </b>You agree not to submit any
                content that is illegal, harmful, threatening, abusive,
                harassing, defamatory, vulgar, obscene, sexually explicit, or
                otherwise objectionable. OffTheWeb reserves the right to remove
                any such content at its sole discretion.
              </p>
              <p>
                <b>4. Privacy: </b>OffTheWeb respects your privacy and takes
                measures to protect your personal information. Please refer to
                our privacy policy for more information on how we collect and
                use your data.
              </p>
              <p>
                <b>5. Links: </b>
                OffTheWeb may contain links to third-party websites. These links
                are provided solely for your convenience and do not constitute
                an endorsement or recommendation by OffTheWeb. We are not
                responsible for the content or accuracy of any third-party
                websites.
              </p>
              <p>
                <b>6. Disclaimer: </b>
                OffTheWeb makes no representations or warranties of any kind,
                express or implied, about the completeness, accuracy,
                reliability, suitability, or availability with respect to the
                website or the information, products, services, or related
                graphics contained on the website for any purpose. Any reliance
                you place on such information is therefore strictly at your own
                risk.
              </p>
              <p>
                <b>7. Limitation of Liability: </b>
                OffTheWeb shall not be liable for any damages arising out of or
                in connection with the use or inability to use this website,
                including but not limited to direct, indirect, incidental,
                punitive, and consequential damages.
              </p>
              <p>
                <b>8. Modifications: </b>
                OffTheWeb reserves the right to modify these terms and
                conditions at any time without prior notice. By continuing to
                use the website after any such modifications, you agree to be
                bound by the revised terms and conditions.
              </p>
              <p>
                <b>9. Governing Law: </b>
                These terms and conditions shall be governed by and construed in
                accordance with the laws of the jurisdiction where OffTheWeb is
                based, without giving effect to any principles of conflicts of
                law.
              </p>
              <p>
                By using OffTheWeb blog website, you acknowledge that you have
                read, understood, and agreed to be bound by these terms and
                conditions.
              </p>
            </div>
          </div>
          <div class="col-lg-4 pt-3 pt-lg-0">
            <Socialfollow />
            <Trending />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
