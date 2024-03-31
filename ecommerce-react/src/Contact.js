import styled from "styled-components";

const Contact = () => {
  const Wrapper = styled.section`
    padding: 9rem 0 5rem 0;
    text-align: center;

    .container {
      margin-top: 6rem;

      .contact-form {
        max-width: 50rem;
        margin: auto;

        .contact-inputs {
          display: flex;
          flex-direction: column;
          gap: 3rem;

          input[type="submit"] {
            cursor: pointer;
            transition: all 0.2s;

            &:hover {
              background-color: ${({ theme }) => theme.colors.white};
              border: 1px solid ${({ theme }) => theme.colors.btn};
              color: ${({ theme }) => theme.colors.btn};
              transform: scale(0.9);
            }
          }
        }
      }
    }
  `;

  return (
    <Wrapper>
      <h2 className="common-heading">Contact page</h2>
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3312.8208848712297!2d72.42911091454016!3d33.86850668065626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df1c192df89e93%3A0x6eaab961b58021ab!2sKamra%20Food%20Corner%20And%20Restaurant!5e0!3m2!1sen!2s!4v1667309928295!5m2!1sen!2s" 
       width="100%" height="400" style={{border:0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      <div className="container">
        <div className="contact-form">
          <form action="https://formspree.io/f/mdojpgko"method="POST"className="contact-inputs">
            <input type="text"placeholder="username"name="username" required autoComplete="off"/>
            <input type="email"name="Email"placeholder="Enter your Email"autoComplete="off"required/>
            <textarea name="Message"cols="30"rows="10"required autoComplete="off"placeholder="Enter your message"></textarea>
            <input type="submit"value="Submit"/>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

export default Contact;
