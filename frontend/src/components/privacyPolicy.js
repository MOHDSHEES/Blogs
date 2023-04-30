import React from "react";
import Socialfollow from "./blog/socialfollow";
import Trending from "./blog/trending";

const PrivacyPolicy = () => {
  return (
    <div style={{ padding: "1rem 15px" }} class="container-fluid ">
      <div style={{ padding: "0" }} class="container">
        <div class="row">
          <div class="col-lg-8">
            <div
              className="bg-light py-3 px-4 mb-3"
              style={{ textAlign: "center" }}
            >
              <h3 className="mb4">Privacy Policies</h3>
            </div>
            <div className="bg-light py-5 px-4 mb-3">
              <p>
                OffTheWeb is committed to protecting your privacy. This privacy
                policy explains how we collect, use, and safeguard your personal
                information.
              </p>
              <p>
                <b>1. Information we collect: </b>We may collect personal
                information such as your name, email address, and other contact
                information when you submit a comment or contact us through our
                website. We may also collect non-personal information such as
                your IP address and browser type when you visit our website.
              </p>
              <p>
                <b>2. Use of information: </b>We use your personal information
                to respond to your inquiries, provide customer support, and
                improve our services. We may also use your email address to send
                you promotional offers or newsletters, but you can opt-out at
                any time.
              </p>
              <p>
                <b>3. Cookies: </b>
                We may use cookies and other tracking technologies to collect
                information about your use of our website. You can control the
                use of cookies through your browser settings.
              </p>
              <p>
                <b>4. Sharing of information: </b>
                We may share your personal information with third-party service
                providers who assist us in providing our services. We will not
                sell or rent your personal information to any third party
                without your consent.
              </p>
              <p>
                <b>5. Data retention: </b>
                We will retain your personal information for as long as
                necessary to fulfill the purposes for which it was collected and
                to comply with applicable laws.
              </p>
              <p>
                <b>6. Security: </b>
                We take reasonable measures to protect your personal information
                from unauthorized access or disclosure. However, we cannot
                guarantee the security of your information.
              </p>
              <p>
                <b>7. Children’s Privacy: </b>
                Our website is not directed to children under the age of 13. We
                do not knowingly collect personal information from children
                under the age of 13.
              </p>
              <p>
                <b>8. Changes to this policy: </b>
                We may update this privacy policy from time to time. Any changes
                will be posted on this page.
              </p>
              <p>
                <b>9. Contact us: </b>
                If you have any questions or concerns about this privacy policy,
                please contact us through our website.
              </p>
              <p>
                By using OffTheWeb blog website, you consent to the collection
                and use of your personal information as described in this
                privacy policy.
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

export default PrivacyPolicy;
