
// Add this component in the same file or in a separate file and import it
import { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import styles from "../Resume.module.css"; // Adjust the path as necessary

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent("Resume Contact from " + form.name);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    console.log("Form submitted:", form);
    window.location.href = `mailto:porschelook@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <form className={styles.contactForm} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        name="name"
        placeholder="Your Name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        className={styles.input}
        type="email"
        name="email"
        placeholder="Your Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <textarea
        className={styles.textarea}
        name="message"
        placeholder="Your Message"
        value={form.message}
        onChange={handleChange}
        required
      />
      <button className={styles.submitBtn} type="submit">
        <FaEnvelope style={{ marginRight: 8 }} /> Send
      </button>
    </form>
  );
}
