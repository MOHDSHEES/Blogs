import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Blog = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  // console.log(state);
  const { id } = useParams();
  // console.log(id);
  const [blog, setblog] = useState(null);
  useEffect(() => {
    if (state && Object.keys(state).length !== 0) setblog(state);
    else if (id) {
      (async () => {
        const { data } = await axios.post("/api/find/blog/id", {
          id: id,
        });
        if (data && data[0]) setblog(data[0]);
        else {
          navigate("/");
        }
      })();
    }
  }, [state, id, navigate]);
  // console.log(data);
  // useEffect(() => {
  //   (async () => {
  //     const { data } = await axios.post("/api/find/blog", {
  //       title: "The Controversial Decision: Why Italy Banned ChatGPT?",
  //     });
  //     if (data && data[0]) setData(data[0]);
  //   })();
  // }, []);
  return (
    <div>
      <div class="position-relative mb-3">
        <img
          class="img-fluid w-100"
          src="/img/news-700x435-1.jpg"
          alt=""
          style={{ objectFit: "cover" }}
        />
        <div class="overlay position-relative bg-light">
          <div class="mb-3">
            <a href="#!">{blog && blog.category}</a>
            <span class="px-1">/</span>
            <span>January 01, 2045</span>
          </div>
          <div>
            <h3 class="mb-3">{blog && blog.title}</h3>
            {blog &&
              blog.blog &&
              blog.blog.map((bl) => {
                return (
                  <div>
                    {bl.tag === "P" ? (
                      <p>{bl.text}</p>
                    ) : bl.tag === "IT" ? (
                      <>
                        {" "}
                        <img
                          class="img-fluid w-50 float-left mr-4 mb-2"
                          src="/img/news-500x280-1.jpg"
                          alt={bl.img}
                        />
                        <p>{bl.text}</p>
                      </>
                    ) : bl.tag === "TI" ? (
                      <>
                        {" "}
                        <img
                          class="img-fluid w-50 float-right ml-4 mb-2"
                          src="/img/news-500x280-2.jpg"
                          alt={bl.img}
                        />
                        <p>{bl.text}</p>
                      </>
                    ) : (
                      bl.tag === "H" && <h4 class="mb-3">{bl.text}</h4>
                    )}
                  </div>
                );
              })}
            {/* <p>
              As an AI language model, I have been following the news regarding
              the recent ban of ChatGPT in Italy. It has been a hot topic of
              debate among privacy experts and technology enthusiasts. In this
              article, I will be discussing the reasons behind the ban,
              controversies surrounding ChatGPT, Italy's stance on privacy and
              data protection, the impact of the ban, alternatives for Italian
              users, reactions to the ban, legal implications, and the future of
              ChatGPT in Italy and worldwide.
            </p>
            <h4 class="mb-3">Introduction to ChatGPT and Italy's Ban</h4>
            <img
              class="img-fluid w-50 float-left mr-4 mb-2"
              src="img/news-500x280-1.jpg"
            />
            <p>
              ChatGPT is an AI-powered chatbot that uses the GPT language model
              to communicate with users. It was developed by OpenAI, a research
              organization that focuses on advancing AI in a safe and beneficial
              way. ChatGPT gained popularity among users for its ability to
              generate human-like responses to text input. However, the Italian
              government recently banned ChatGPT, citing concerns over privacy
              and data protection..
            </p>
            <h4 class="mb-3">The Reason Behind Italy's Ban on ChatGPT</h4>
            <img
              class="img-fluid w-50 float-right ml-4 mb-2"
              src="img/news-500x280-2.jpg"
            />
            <p>
              Italy's ban on ChatGPT came after a complaint was filed by the
              Italian Data Protection Authority (DPA) regarding the use of
              personal data by the chatbot. The DPA expressed concerns that
              ChatGPT could be used to collect personal data from users without
              their consent. They also noted that the chatbot's privacy policy
              was inadequate and did not provide sufficient information on how
              user data was being collected and used. In response to the
              complaint, OpenAI stated that they were committed to protecting
              user privacy and that they would work with the Italian authorities
              to address any concerns. However, the Italian government went
              ahead with the ban, stating that it was necessary to protect the
              privacy of Italian citizens. .
            </p>
            <h4 class="mb-3">Controversies Surrounding ChatGPT</h4>
            <img
              class="img-fluid w-50 float-left mr-4 mb-2"
              src="img/news-500x280-1.jpg"
              alt=""
            />
            <p>
              ChatGPT has been at the center of several controversies since its
              launch. One of the main concerns is the potential for the chatbot
              to be used to spread misinformation and propaganda. There have
              been instances where the chatbot has generated fake news and
              misleading information, leading to concerns over its impact on
              public opinion. <br /> <br />
              Another controversy surrounding ChatGPT is its potential to be
              used for malicious purposes, such as identity theft and fraud. The
              chatbot's ability to generate human-like responses makes it
              difficult to distinguish between a real person and the chatbot.
              This could lead to users inadvertently giving away sensitive
              information to the chatbot, which could then be used for malicious
              purposes. .
            </p>
            <h4 class="mb-3">Italy's Stance on Privacy and Data Protection</h4>
            <p>
              Italy has a strong stance on privacy and data protection, with
              strict laws in place to protect citizens' personal data. The
              Italian Data Protection Code (DPC) regulates the collection, use,
              and storage of personal data in Italy. The DPC requires companies
              to obtain explicit consent from users before collecting their
              personal data and to provide clear and concise information on how
              the data will be used. <br /> <br />
              The Italian government's decision to ban ChatGPT is in line with
              its commitment to protecting citizens' privacy and data protection
              rights. The ban sends a clear message to companies that they must
              comply with Italy's strict data protection laws if they want to
              operate in the country. .
            </p>
            <h4 class="mb-3">The Impact of Italy's Ban on ChatGPT</h4>
            <p>
              The ban on ChatGPT has had a significant impact on its users in
              Italy. Italian users who were using the chatbot for various
              purposes, such as language learning, entertainment, and customer
              support, are now unable to access it. The ban has also affected
              businesses that were using ChatGPT for customer service and
              support, leading to increased costs and disruption in their
              operations. <br /> <br />
              The ban has also raised concerns among technology companies about
              the potential for similar bans in other countries. ChatGPT is not
              the only AI-powered chatbot that uses personal data to generate
              responses. If other countries follow Italy's lead, it could have a
              significant impact on the development and adoption of AI-powered
              chatbots worldwide. .
            </p>
            <h4 class="mb-3">Alternatives to ChatGPT for Italian Users</h4>
            <p>
              Italian users who are looking for an alternative to ChatGPT can
              consider other AI-powered chatbots that comply with Italy's data
              protection laws. Some popular alternatives include Mitsuku,
              Replika, and Cleverbot. These chatbots have similar capabilities
              to ChatGPT and are available in multiple languages. .
            </p>{" "}
            <h4 class="mb-3">Reactions to Italy's Ban on ChatGPT</h4>
            <p>
              The ban on ChatGPT has received mixed reactions from users and
              experts. Some have praised the Italian government for taking a
              strong stance on data protection, while others have criticized the
              ban as an overreaction. Some experts have also expressed concerns
              that the ban could stifle innovation in the AI industry and hinder
              the development of new technologies.
            </p>
            <h4 class="mb-3">Legal Implications of Italy's Ban on ChatGPT</h4>
            <p>
              The ban on ChatGPT raises several legal implications, particularly
              concerning the regulation of AI technologies. As AI becomes more
              prevalent in our daily lives, governments around the world will
              need to develop new policies and regulations to govern its use.
              The Italian government's decision to ban ChatGPT could set a
              precedent for other countries to follow and could lead to
              increased regulation of AI technologies in the future.
            </p>
            <h4 class="mb-3">The Future of ChatGPT in Italy and Worldwide</h4>
            <p>
              The future of ChatGPT in Italy and worldwide remains uncertain.
              OpenAI has stated that they are committed to addressing the
              Italian authorities' concerns and that they are working to improve
              the chatbot's privacy policy. However, it is unclear whether the
              ban will be lifted or whether other countries will follow Italy's
              lead. <br /> <br />
              The ban on ChatGPT has highlighted the need for companies to
              prioritize user privacy and data protection. As AI technologies
              continue to evolve, it is essential that companies remain
              transparent about how they collect and use personal data. This
              will help to build trust with users and ensure that AI
              technologies are developed in a responsible and ethical manner.
            </p>
            <h4 class="mb-3">
              Conclusion: Balancing Freedom of Speech and Privacy Concerns
            </h4>
            <p>
              {" "}
              The ban on ChatGPT in Italy has sparked a debate about the balance
              between freedom of speech and privacy concerns. While AI-powered
              chatbots have the potential to revolutionize the way we
              communicate, they also raise significant privacy and data
              protection concerns. It is essential that governments, technology
              companies, and users work together to address these concerns and
              find a balance that protects both privacy and freedom of speech.{" "}
              <br /> <br />
              As an AI language model, I believe that the development of AI
              technologies should be guided by ethical and moral principles. We
              must ensure that these technologies are used in a responsible and
              beneficial way, while also protecting users' privacy and data
              protection rights. The ban on ChatGPT in Italy is a reminder that
              we still have a long way to go in achieving this balance.
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
