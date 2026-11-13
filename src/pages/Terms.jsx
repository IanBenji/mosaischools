import { Link } from 'react-router-dom'
import { FileText, Mail, Phone } from 'lucide-react'

const LAST_UPDATED = '11 June 2026'

export default function Terms() {
  return (
    <main className="bg-mist">

      {/* Page header */}
      <section className="relative bg-mosai-blue-dark pt-36 pb-14">
        <div className="absolute inset-0 bg-gradient-to-r from-mosai-blue-dark via-mosai-blue-dark/95 to-mosai-blue" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 font-body text-sm text-white/50 mb-4">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Terms of Use</span>
          </nav>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-11 h-11 bg-mosai-red rounded-xl flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-white leading-tight">
              Terms of <span className="text-mosai-red">Use</span>
            </h1>
          </div>
          <p className="font-body text-white/70 text-sm">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

          <p className="font-body text-gray-600 leading-relaxed">
            Welcome to the Mosai Schools website. By accessing or using this website, you agree to
            these Terms of Use. If you do not agree with any part of these terms, please discontinue
            use of the website.
          </p>

          <Section title="1. Use of the Website">
            <p>
              This website is provided for general information about Mosai Schools, our programmes,
              admissions, and campus life. You agree to use it only for lawful purposes and in a way
              that does not infringe the rights of, or restrict the use of this website by, any other party.
            </p>
          </Section>

          <Section title="2. Information Accuracy">
            <p>
              We make every effort to keep the information on this website accurate and up to date.
              However, details such as fees, programme offerings, term dates, and campus information may
              change. The information here is for general guidance and does not form part of any contract.
              For confirmed and current details, please contact the school directly.
            </p>
          </Section>

          <Section title="3. Admissions Enquiries">
            <p>
              Submitting an enquiry or application form through this website does not guarantee
              admission. All applications are subject to the school's admissions process, availability,
              and assessment. The school reserves the right to accept or decline any application.
            </p>
          </Section>

          <Section title="4. Fees &amp; Payments">
            <p>
              School fees and any related payments are handled exclusively through the official
              <strong> School Pay System</strong>. We will never request payment through this website or
              by any other channel. Always verify payment instructions directly with the school
              administration before making any transfer.
            </p>
          </Section>

          <Section title="5. Intellectual Property">
            <p>
              All content on this website, including text, logos, images and design, is the property
              of Mosai Schools or its licensors and is protected by applicable laws. You may not
              reproduce, distribute, or use this content for commercial purposes without our written permission.
            </p>
          </Section>

          <Section title="6. External Links">
            <p>
              This website may contain links to third party websites or services (for example, maps or
              social media). We are not responsible for the content or privacy practices of those external sites.
            </p>
          </Section>

          <Section title="7. Limitation of Liability">
            <p>
              Mosai Schools shall not be liable for any loss or damage arising from your use of, or
              inability to use, this website, to the fullest extent permitted by law.
            </p>
          </Section>

          <Section title="8. Governing Law">
            <p>
              These Terms of Use are governed by the laws of the Republic of Uganda. Mosai Schools is
              licensed by the Ministry of Education and Sports, Uganda.
            </p>
          </Section>

          <Section title="9. Changes to These Terms">
            <p>
              We may revise these Terms of Use at any time. Continued use of the website after changes
              are posted constitutes acceptance of the revised terms.
            </p>
          </Section>

          {/* Contact box */}
          <div className="bg-mosai-blue-light rounded-2xl p-6">
            <h3 className="font-heading font-bold text-lg text-mosai-blue-dark mb-3">Questions?</h3>
            <p className="font-body text-sm text-gray-600 mb-4">
              If you have any questions about these terms, please contact us:
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="mailto:mosaischools@gmail.com" className="inline-flex items-center gap-2 font-body text-sm font-semibold text-mosai-blue hover:text-mosai-blue-dark transition-colors">
                <Mail className="w-4 h-4" /> mosaischools@gmail.com
              </a>
              <a href="tel:0759889401" className="inline-flex items-center gap-2 font-body text-sm font-semibold text-mosai-blue hover:text-mosai-blue-dark transition-colors">
                <Phone className="w-4 h-4" /> 0759889401
              </a>
            </div>
          </div>

        </div>
      </section>
    </main>
  )
}

function Section({ title, children }) {
  return (
    <div>
      <h2 className="font-heading font-extrabold text-xl text-mosai-blue-dark mb-3">{title}</h2>
      <div className="font-body text-gray-600 leading-relaxed space-y-3 [&_strong]:text-mosai-blue-dark">
        {children}
      </div>
    </div>
  )
}
