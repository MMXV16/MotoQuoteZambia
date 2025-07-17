import { motion } from "framer-motion";
import { ArrowRight, User, Car, CheckCircle } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-gray-900">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Insure Smarter, Faster,<br />
                <span className="text-blue-200">The Zambian Way</span>
              </h2>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
                Get instant motor insurance quotes tailored for Zambian vehicle owners. 
                Quick, transparent, and built for you.
              </p>
              <Link href="/quote">
                <Button 
                  size="lg"
                  className="bg-white text-primary hover:bg-neutral-50 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                >
                  Start My Quote
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-neutral-800 dark:text-white mb-4">How It Works</h3>
            <p className="text-xl text-neutral-600 dark:text-gray-200 max-w-2xl mx-auto">
              Get your motor insurance quote in just 3 simple steps
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: User,
                title: "1. Personal Details",
                description: "Provide your name, NRC/Passport, phone number, and email address.",
              },
              {
                icon: Car,
                title: "2. Vehicle Information",
                description: "Tell us about your vehicle - make, model, year, and registration details.",
              },
              {
                icon: CheckCircle,
                title: "3. Get Your Quote",
                description: "Choose your coverage and get an instant quote with detailed breakdown.",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-xl bg-neutral-50 dark:bg-gray-800 hover:bg-neutral-100 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-neutral-800 dark:text-white mb-4">{step.title}</h4>
                <p className="text-neutral-600 dark:text-gray-200">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
