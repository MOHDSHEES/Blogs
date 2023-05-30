import React from "react";

const Career = () => {
  return (
    <div style={{ padding: "1rem 15px" }} class="container-fluid ">
      <div style={{ padding: "0" }} class="container">
        <div style={{ textAlign: "center" }}>
          <h3 className="mb-4 mt-5">
            Career Opportunities <br /> Current Openings{" "}
          </h3>
        </div>

        <div class="accordion" id="accordionExample">
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                1) Social Media Management Intern
              </button>
            </h2>
            <div
              id="collapseOne"
              class="accordion-collapse collapse "
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                <strong>Department:</strong> Marketing
                <br />
                <br />
                <strong>Reports to:</strong> Social Media Manager
                <br />
                <br />
                <strong>Summary</strong>
                <br />
                The Social Media Management Intern is responsible for supporting
                the social media team in the development and execution of social
                media marketing campaigns. The intern will be responsible for
                creating and scheduling social media posts, engaging with
                followers, and tracking analytics. <br />
                <br />
                <strong>Responsibilities:</strong>
                <br /> * Create and schedule social media posts that are aligned
                with the company's brand and marketing goals
                <br /> * Engage with followers on social media platforms, such
                as Facebook, Twitter, and Instagram
                <br /> * Respond to comments and questions from followers <br />
                * Track social media analytics to measure the success of
                campaigns
                <br /> * Assist with the development and execution of social
                media marketing campaigns.
                <br />
                <br />
                <strong>Qualifications:</strong>
                <br /> * Enrolled in a college or university with a major in
                marketing, communications, or a related field <br />* Strong
                writing and editing skills <br /> * Experience with social media
                platforms, such as Facebook, Twitter, and Instagram
                <br /> * Ability to work independently and as part of a team
                <br /> * Strong attention to detail <br />* Excellent
                communication skills.
                <br />
                <br />
                <strong>Benefits:</strong> <br />* Unpaid internship
                <br /> * Opportunity to gain experience in social media
                marketing
                <br /> * Chance to work with a team of experienced professionals
                <br /> * Discounts on company products and services.
                <br />
                <br />
                <strong>To Apply:</strong> Please send your resume and cover
                letter to [email protected]
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                2) Social Digital Marketing & SEO Intern
              </button>
            </h2>
            <div
              id="collapseTwo"
              class="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                <strong>Department:</strong> Marketing
                <br />
                <br />
                <strong>Reports to:</strong> Marketing Manager
                <br />
                <br />
                <strong>Summary:</strong>
                The Social Digital Marketing & SEO Intern is responsible for
                supporting the marketing team in the development and execution
                of social media marketing campaigns, as well as the optimization
                of the company's website for search engines. The intern will be
                responsible for creating and scheduling social media posts,
                conducting keyword research, and optimizing website content.
                <br />
                <br />
                <strong>Responsibilities:</strong>
                * Create and schedule social media posts that are aligned with
                the company's brand and marketing goals.
                <br />
                * Conduct keyword research and optimize website content for
                search engines.
                <br />
                * Track social media analytics to measure the success of
                campaigns.
                <br />
                * Assist with the development and execution of social media
                marketing campaigns.
                <br />
                <br />
                <strong>Qualifications:</strong>
                * Enrolled in a college or university with a major in marketing,
                communications, or a related field.
                <br />
                * Strong writing and editing skills.
                <br />
                * Experience with social media platforms, such as Facebook,
                Twitter, and Instagram.
                <br />
                * Experience with SEO tools and techniques.
                <br />
                * Ability to work independently and as part of a team.
                <br />
                * Strong attention to detail.
                <br />
                * Excellent communication skills.
                <br />
                <br />
                <strong>Benefits:</strong>
                * Unpaid internship.
                <br />
                * Opportunity to gain experience in social media marketing and
                SEO.
                <br />
                * Chance to work with a team of experienced professionals.
                <br />
                * Discounts on company products and services.
                <br />
                <br />
                <strong>To Apply:</strong>
                Please send your resume and cover letter to [email protected]
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;