import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, Phone, Linkedin, Github, FileText, Send, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import emailjs from '@emailjs/browser';

const contactLinks = [
  { icon: Mail, label: 'Email', value: 'work.shikharpathak@gmail.com', href: 'mailto:work.shikharpathak@gmail.com' },
  { icon: Phone, label: 'Phone', value: '+91-7302180143', href: 'tel:+917302180143' },
  { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/shikhar-pathak', href: 'https://www.linkedin.com/in/shikhar-pathak' },
  { icon: Github, label: 'GitHub', value: 'github.com/shikharpathak', href: 'https://github.com/shikharpathak' },
];

export function Contact() {
  const ref = useRef(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = (formData: FormData) => {
    const newErrors: { [key: string]: string } = {};
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    if (!name || name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!message || message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast({
        title: 'Validation Error',
        description: 'Please fix the errors in the form',
        variant: 'destructive',
      });
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey ||
        serviceId.includes('your_') || templateId.includes('your_') || publicKey.includes('your_')) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        toast({
          title: 'Demo Mode',
          description: 'EmailJS is not configured yet. In production, this would send an email. Please set up EmailJS credentials in .env file.',
        });
        formRef.current.reset();
        setIsSubmitting(false);
        return;
      }

      await emailjs.sendForm(serviceId, templateId, formRef.current, publicKey);

      toast({
        title: 'Message sent successfully!',
        description: 'Thanks for reaching out. I\'ll get back to you soon.',
      });

      formRef.current.reset();
    } catch (error) {
      console.error('EmailJS Error:', error);
      toast({
        title: 'Failed to send message',
        description: 'Please try again or email me directly at work.shikharpathak@gmail.com',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-secondary/30">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-mono text-primary mb-3">Contact</p>

          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
            Get in touch
          </h2>

          <p className="text-muted-foreground mb-10 max-w-lg">
            Have a project in mind or want to discuss opportunities? I'd love to hear from you.
          </p>

          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="space-y-3 mb-8">
                {contactLinks.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                    className="flex items-center gap-3 p-3 rounded-lg glass hover:border-primary/50 hover-glow-primary transition-all duration-300 hover:scale-105 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <item.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      <p className="text-sm text-foreground font-medium">{item.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>

              <Button
                variant="outline"
                className="w-full hover:border-primary/50 hover-glow-primary transition-all hover:scale-105"
                onClick={() => window.open('/resume.pdf', '_blank')}
              >
                <FileText className="mr-2 h-4 w-4" />
                Download Resume
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 15 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="glass-strong rounded-lg p-6"
            >
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1.5 text-foreground">
                      Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your name"
                      required
                      className={`bg-background/50 backdrop-blur-sm border-border focus:border-primary/50 transition-colors ${errors.name ? 'border-red-500' : ''
                        }`}
                    />
                    {errors.name && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1.5 text-foreground">
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      required
                      className={`bg-background/50 backdrop-blur-sm border-border focus:border-primary/50 transition-colors ${errors.email ? 'border-red-500' : ''
                        }`}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1.5 text-foreground">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Your message..."
                    rows={4}
                    required
                    className={`bg-background/50 backdrop-blur-sm border-border focus:border-primary/50 transition-colors resize-none ${errors.message ? 'border-red-500' : ''
                      }`}
                  />
                  {errors.message && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-foreground text-background hover:bg-foreground/90 hover-glow-primary transition-all duration-300 hover:scale-105"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Send className="mr-2 h-4 w-4 animate-pulse" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
