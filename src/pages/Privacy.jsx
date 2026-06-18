import { Link } from 'react-router-dom'
import { Shield, Mail, Phone } from 'lucide-react'

const LAST_UPDATED = '11 June 2026'

export default function Privacy() {
  return (
    <main className="bg-white">

      {/* Page header */}
      <section className="relative bg-mosai-blue-dark pt-36 pb-14">
        <div className="absolute inset-0 bg-gradient-to-r from-mosai-blue-dark via-mosai-blue-dark/95 to-mosai-blue" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 font-body text-sm text-white/50 mb-4">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Privacy Policy</span>
          </nav>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-11 h-11 bg-mosai-red rounded-xl flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-white leading-tight">
              Privacy <span className="text-mosai-red">Policy</span>
            </h1>
          </div>
          <p className="font-body text-white/70 text-sm">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose-mosai space-y-8">

          <p className="font-body text-gray-600 leading-relaxed">
            MOSAI Schools ("we", "us", or "our") is committed to protecting the privacy of
            parents, learners, staff, and visitors. This policy explains what information we
            collect through our website, how we use it, and the choices you have. By using
            this website, you agree to the practices described below.
          </p>

          <Section title="1. Information We Collect">
            <p>We only collect information you choose to provide, including:</p>
            <ul>
              <li><strong>Contact &amp; enquiry details</strong> — your name, email address, phone number, and the contents of any message you send through our contact or admissions forms.</li>
              <li><strong>Admissions information</strong> — details you submit when enquiring about or applying for a place, such as the prospective learner's name and programme of interest.</li>
            </ul>
            <p>
              We do <strong>not</strong> sell your personal information, and we do not collect
              sensitive data through this website beyond what you voluntarily include in a message.
            </p>
          </Section>

          <Section title="2. How We Use Your Information">
            <ul>
              <li>To respond to your enquiries and admissions requests.</li>
              <li>To communicate with you about school programmes, events, and announcements you have asked about.</li>
              <li>To improve our website and the services we offer families.</li>
            </ul>
          </Section>

          <Section title="3. How Your Information Is Handled">
            <p>
              Contact and admissions forms on this website are delivered to us by email through a
              trusted third-party delivery service. Submissions are protected by anti-spam measures,
              including a CAPTCHA challenge. We retain enquiry messages only for as long as needed to
              respond to and follow up on your request.
            </p>
          </Section>

          <Section title="4. Sharing of Information">
            <p>
              We will not share your information with third parties for marketing purposes. We may
              share information only where required to do so by law, or with service providers who
              help us operate this website and respond to enquiries, under appropriate confidentiality
              obligations.
            </p>
          </Section>

          <Section title="5. Cookies &amp; Analytics">
            <p>
              This website uses only the cookies necessary for it to function. We do not currently
              use third-party advertising cookies. If we introduce analytics in future, this policy
              will be updated accordingly.
            </p>
          </Section>

          <Section title="6. Your Rights">
            <p>
              You may request access to, correction of, or deletion of the personal information you
              have shared with us. To make a request, contact us using the details below and we will
              respond within a reasonable time.
            </p>
          </Section>

          <Section title="7. Children's Privacy">
            <p>
              We understand the importance of safeguarding children's data. Information about learners
              is provided by parents or guardians and is used solely for admissions and school
              communication purposes.
            </p>
          </Section>

          <Section title="8. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. The "last updated" date at the top
              of this page reflects the most recent revision.
            </p>
          </Section>

          {/* Contact box */}
          <div className="bg-mosai-blue-light rounded-2xl p-6 not-prose">
            <h3 className="font-heading font-bold text-lg text-mosai-blue-dark mb-3">Contact Us About Privacy</h3>
            <p className="font-body text-sm text-gray-600 mb-4">
              If you have any questions about this policy or how your information is handled, please reach out:
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="mailto:info@mosaischools.ug" className="inline-flex items-center gap-2 font-body text-sm font-semibold text-mosai-blue hover:text-mosai-blue-dark transition-colors">
                <Mail className="w-4 h-4" /> info@mosaischools.ug
              </a>
              <a href="tel:+256700123456" className="inline-flex items-center gap-2 font-body text-sm font-semibold text-mosai-blue hover:text-mosai-blue-dark transition-colors">
                <Phone className="w-4 h-4" /> +256 700 123 456
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
      <div className="font-body text-gray-600 leading-relaxed space-y-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_strong]:text-mosai-blue-dark">
        {children}
      </div>
    </div>
  )
}
