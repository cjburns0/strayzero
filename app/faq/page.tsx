import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-black text-green-400 font-mono">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-green-300 mb-4">FAQ & Contact</h1>
            <p className="text-green-500">Get answers or reach out to us</p>
          </div>

          {/* FAQ Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-green-300 mb-8">Frequently Asked Questions</h2>

            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="border-green-900/50">
                <AccordionTrigger className="text-green-400 hover:text-green-300">
                  How accurate are StrayZero's ballistic calculations?
                </AccordionTrigger>
                <AccordionContent className="text-green-500">
                  StrayZero uses advanced ballistic modeling algorithms that account for atmospheric conditions, bullet
                  characteristics, and environmental factors to provide precision calculations within industry-standard
                  tolerances.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-green-900/50">
                <AccordionTrigger className="text-green-400 hover:text-green-300">
                  Can I import my data from Strelok?
                </AccordionTrigger>
                <AccordionContent className="text-green-500">
                  Yes, StrayZero includes migration tools to help you import your rifle profiles and settings from
                  Strelok and other popular ballistic applications.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-green-900/50">
                <AccordionTrigger className="text-green-400 hover:text-green-300">
                  Does StrayZero work offline?
                </AccordionTrigger>
                <AccordionContent className="text-green-500">
                  Core ballistic calculations work offline. Weather data and some advanced features require an internet
                  connection for real-time updates.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border-green-900/50">
                <AccordionTrigger className="text-green-400 hover:text-green-300">
                  What platforms does StrayZero support?
                </AccordionTrigger>
                <AccordionContent className="text-green-500">
                  StrayZero is a web-based application that works on any device with a modern browser, including
                  smartphones, tablets, and desktop computers.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border-green-900/50">
                <AccordionTrigger className="text-green-400 hover:text-green-300">
                  Is there a free trial available?
                </AccordionTrigger>
                <AccordionContent className="text-green-500">
                  Yes, we offer a 14-day free trial with full access to Pro features. No credit card required to start.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Contact Section */}
          <div className="bg-green-950/10 border border-green-900/50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-green-300 mb-6">Contact Us</h2>

            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-green-400 mb-2">Name</label>
                  <Input
                    className="bg-black border-green-900/50 text-green-400 focus:border-green-700"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-green-400 mb-2">Email</label>
                  <Input
                    type="email"
                    className="bg-black border-green-900/50 text-green-400 focus:border-green-700"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-green-400 mb-2">Subject</label>
                <Input
                  className="bg-black border-green-900/50 text-green-400 focus:border-green-700"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-green-400 mb-2">Message</label>
                <Textarea
                  className="bg-black border-green-900/50 text-green-400 focus:border-green-700 min-h-[120px]"
                  placeholder="Tell us more about your question or feedback..."
                />
              </div>

              <Button className="w-full bg-green-900 hover:bg-green-800 text-green-100 border border-green-700">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
