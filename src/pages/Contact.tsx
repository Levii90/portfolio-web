import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Mail, Phone, Send } from 'lucide-react';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (field: 'name' | 'email' | 'message') => (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all fields.');
      setSubmitted(false);
      return;
    }
    setError('');
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section className="relative py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_0.45fr]">
          <div className="rounded-[32px] border border-white/10 bg-surface/95 p-8 shadow-glow backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.28em] text-accent">Contact</p>
            <h1 className="mt-4 text-4xl font-semibold text-text">Let's build the next cyber-friendly digital experience together.</h1>
            <p className="mt-6 text-muted leading-8">
              Saya siap berdiskusi mengenai project web development, keamanan siber, dan sistem smart city. Kirim pesan singkat kepada saya untuk peluang kolaborasi atau studi kasus.
            </p>
            <div className="mt-10 space-y-4">
              <div className="flex items-center gap-4 rounded-3xl border border-white/10 bg-[#09131f] p-5">
                <Mail size={20} className="text-accent" />
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-accent">Email</p>
                  <p className="text-text">hello@0xp1etlab.dev</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-3xl border border-white/10 bg-[#09131f] p-5">
                <Phone size={20} className="text-accent" />
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-accent">Phone</p>
                  <p className="text-text">+62 812-3456-7890</p>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-[32px] border border-white/10 bg-[#08111d]/95 p-8 shadow-glow backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.28em] text-accent">Send a quick note</p>
            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <input
                type="text"
                value={formData.name}
                onChange={handleChange('name')}
                placeholder="Your name"
                className="w-full rounded-3xl border border-white/10 bg-[#07111c] px-5 py-4 text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
              <input
                type="email"
                value={formData.email}
                onChange={handleChange('email')}
                placeholder="Your email"
                className="w-full rounded-3xl border border-white/10 bg-[#07111c] px-5 py-4 text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
              <textarea
                rows={5}
                value={formData.message}
                onChange={handleChange('message')}
                placeholder="Message"
                className="w-full rounded-3xl border border-white/10 bg-[#07111c] px-5 py-4 text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
              {error && <p className="text-sm text-red-400">{error}</p>}
              {submitted && <p className="text-sm text-emerald-300">Message ready. This form is static, so you can wire it to email service later.</p>}
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-[#0f77cf]"
              >
                <Send size={16} /> Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
