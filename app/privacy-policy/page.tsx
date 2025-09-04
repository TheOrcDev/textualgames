import Link from "next/link";

import { Button } from "@/components/ui/8bit/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/8bit/card";

export default function PrivacyPolicy() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex justify-center items-center mb-5">
        <Button asChild>
          <Link href="/">Back to home</Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Privacy Policy
          </CardTitle>
          <p className="text-center text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              Textual Games (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;)
              is committed to protecting your privacy. This Privacy Policy
              explains how we collect, use, disclose, and safeguard your
              information when you use our AI-powered text-based game creation
              platform. Please read this privacy policy carefully. If you do not
              agree with the terms of this privacy policy, please do not access
              the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              2. Information We Collect
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <h3 className="text-xl font-medium text-foreground">
                Personal Information
              </h3>
              <p>
                We collect information you provide directly to us, including:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>Account Information:</strong> Email address, username,
                  and password when you create an account
                </li>
                <li>
                  <strong>Profile Information:</strong> Name, avatar, and other
                  profile details you choose to provide
                </li>
                <li>
                  <strong>Payment Information:</strong> Billing details and
                  payment method information (processed securely by third-party
                  payment processors)
                </li>
                <li>
                  <strong>Communication Data:</strong> Messages you send to our
                  support team or feedback you provide
                </li>
              </ul>

              <h3 className="text-xl font-medium text-foreground">
                Game Content and Usage Data
              </h3>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>Game Content:</strong> Stories, characters, plots,
                  items, and other content you create using our platform
                </li>
                <li>
                  <strong>Character Data:</strong> Character names, types,
                  genders, plots, and items you create
                </li>
                <li>
                  <strong>Game Interactions:</strong> Your choices, decisions,
                  and gameplay progress
                </li>
                <li>
                  <strong>Usage Analytics:</strong> How you interact with our
                  platform, features used, and time spent
                </li>
              </ul>

              <h3 className="text-xl font-medium text-foreground">
                Automatically Collected Information
              </h3>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>Device Information:</strong> IP address, browser type,
                  operating system, and device identifiers
                </li>
                <li>
                  <strong>Usage Data:</strong> Pages visited, features used,
                  session duration, and interaction patterns
                </li>
                <li>
                  <strong>Log Data:</strong> Server logs, error reports, and
                  performance metrics
                </li>
                <li>
                  <strong>Cookies and Tracking:</strong> Information collected
                  through cookies and similar technologies
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              3. How We Use Your Information
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>Provide and Maintain the Service:</strong> Create and
                  manage your account, process payments, and deliver our
                  AI-powered game creation features
                </li>
                <li>
                  <strong>Generate AI Content:</strong> Use your input to create
                  stories, characters, and game content using artificial
                  intelligence
                </li>
                <li>
                  <strong>Improve Our Service:</strong> Analyze usage patterns
                  to enhance features, fix bugs, and optimize performance
                </li>
                <li>
                  <strong>Communicate with You:</strong> Send important updates,
                  respond to support requests, and provide customer service
                </li>
                <li>
                  <strong>Enforce Terms and Security:</strong> Monitor for
                  violations of our terms of service and protect against fraud
                  or abuse
                </li>
                <li>
                  <strong>Legal Compliance:</strong> Comply with applicable
                  laws, regulations, and legal processes
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              4. Information Sharing and Disclosure
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                We do not sell, trade, or rent your personal information to
                third parties. We may share your information in the following
                circumstances:
              </p>

              <h3 className="text-xl font-medium text-foreground">
                Service Providers
              </h3>
              <p>
                We share information with trusted third-party service providers
                who assist us in operating our platform:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>xAI Grok:</strong> For AI story and character
                  generation services
                </li>
                <li>
                  <strong>Polar:</strong> For payment processing and
                  subscription management
                </li>
                <li>
                  <strong>Neon Database:</strong> For secure data storage and
                  management
                </li>
                <li>
                  <strong>Vercel:</strong> For hosting, analytics, and
                  performance monitoring
                </li>
                <li>
                  <strong>Resend:</strong> For email delivery and communication
                </li>
                <li>
                  <strong>Google:</strong> For authentication services (if you
                  choose to sign in with Google)
                </li>
              </ul>

              <h3 className="text-xl font-medium text-foreground">
                Legal Requirements
              </h3>
              <p>We may disclose your information if required to:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Comply with legal obligations or court orders</li>
                <li>Protect our rights, property, or safety</li>
                <li>Protect the rights, property, or safety of our users</li>
                <li>Investigate or prevent fraud or security issues</li>
              </ul>

              <h3 className="text-xl font-medium text-foreground">
                Business Transfers
              </h3>
              <p>
                In the event of a merger, acquisition, or sale of assets, your
                information may be transferred as part of that transaction.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                We implement appropriate technical and organizational security
                measures to protect your personal information against
                unauthorized access, alteration, disclosure, or destruction:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>Encryption:</strong> Data is encrypted in transit and
                  at rest using industry-standard protocols
                </li>
                <li>
                  <strong>Access Controls:</strong> Strict access controls limit
                  who can view or modify your data
                </li>
                <li>
                  <strong>Secure Infrastructure:</strong> Our services are
                  hosted on secure, enterprise-grade infrastructure
                </li>
                <li>
                  <strong>Regular Audits:</strong> We regularly review and
                  update our security practices
                </li>
                <li>
                  <strong>Incident Response:</strong> We have procedures in
                  place to respond to potential security incidents
                </li>
              </ul>
              <p>
                However, no method of transmission over the internet or
                electronic storage is 100% secure. While we strive to protect
                your information, we cannot guarantee absolute security.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              6. Cookies and Tracking Technologies
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                We use cookies and similar tracking technologies to enhance your
                experience on our platform:
              </p>

              <h3 className="text-xl font-medium text-foreground">
                Types of Cookies We Use
              </h3>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>Essential Cookies:</strong> Required for basic
                  functionality, authentication, and security
                </li>
                <li>
                  <strong>Analytics Cookies:</strong> Help us understand how you
                  use our platform (via Vercel Analytics)
                </li>
                <li>
                  <strong>Preference Cookies:</strong> Remember your settings
                  and preferences
                </li>
                <li>
                  <strong>Session Cookies:</strong> Maintain your session while
                  using the platform
                </li>
              </ul>

              <p>
                You can control cookies through your browser settings, but
                disabling certain cookies may affect the functionality of our
                platform.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              7. Your Rights and Choices
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                You have the following rights regarding your personal
                information:
              </p>

              <h3 className="text-xl font-medium text-foreground">
                Access and Portability
              </h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Request access to your personal information</li>
                <li>Request a copy of your data in a portable format</li>
                <li>View and update your account information</li>
              </ul>

              <h3 className="text-xl font-medium text-foreground">
                Correction and Updates
              </h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Correct inaccurate or incomplete information</li>
                <li>Update your profile and preferences</li>
                <li>Modify your game content and characters</li>
              </ul>

              <h3 className="text-xl font-medium text-foreground">
                Deletion and Restriction
              </h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Request deletion of your account and associated data</li>
                <li>Delete specific games or content you created</li>
                <li>Restrict processing of your information</li>
              </ul>

              <h3 className="text-xl font-medium text-foreground">
                Communication Preferences
              </h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Opt out of marketing communications</li>
                <li>Manage notification preferences</li>
                <li>Unsubscribe from email updates</li>
              </ul>

              <p>
                To exercise these rights, please contact us at{" "}
                <Link
                  href="mailto:theorcdev@gmail.com"
                  className="text-primary hover:underline"
                >
                  theorcdev@gmail.com
                </Link>
                . We will respond to your request within 30 days.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              8. Children&apos;s Privacy
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Our Service is not intended for children under 13 years of age.
                We do not knowingly collect personal information from children
                under 13. If you are a parent or guardian and believe your child
                has provided us with personal information, please contact us
                immediately.
              </p>
              <p>
                If we discover that we have collected personal information from
                a child under 13, we will take steps to delete such information
                from our servers.
              </p>
              <p>
                Users between 13 and 18 years of age should have parental
                consent before using our Service.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              9. International Data Transfers
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Your information may be transferred to and processed in
                countries other than your own. We ensure that such transfers
                comply with applicable data protection laws and implement
                appropriate safeguards to protect your information.
              </p>
              <p>
                Our service providers may be located in different countries, and
                we ensure they maintain adequate data protection standards
                through contractual agreements and other appropriate measures.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Data Retention</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                We retain your personal information for as long as necessary to
                provide our services and fulfill the purposes outlined in this
                Privacy Policy:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>Account Information:</strong> Retained while your
                  account is active and for a reasonable period after
                  deactivation
                </li>
                <li>
                  <strong>Game Content:</strong> Retained until you delete it or
                  close your account
                </li>
                <li>
                  <strong>Usage Data:</strong> Retained for analytics and
                  service improvement purposes
                </li>
                <li>
                  <strong>Payment Information:</strong> Retained as required by
                  law and payment processors
                </li>
              </ul>
              <p>
                We will delete or anonymize your information when it is no
                longer needed, unless we are required to retain it for legal or
                regulatory purposes.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              11. Changes to This Privacy Policy
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                We may update this Privacy Policy from time to time. We will
                notify you of any material changes by:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Posting the updated policy on our website</li>
                <li>Sending you an email notification</li>
                <li>Displaying a notice on our platform</li>
              </ul>
              <p>
                Your continued use of our Service after any changes to this
                Privacy Policy constitutes your acceptance of the updated
                policy.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              12. Contact Information
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                If you have any questions about this Privacy Policy or our data
                practices, please contact us at:
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <p>
                  <strong>Email:</strong>{" "}
                  <Link
                    href="mailto:theorcdev@gmail.com"
                    className="text-primary hover:underline"
                  >
                    theorcdev@gmail.com
                  </Link>
                </p>
                <p>
                  <strong>Website:</strong>{" "}
                  <Link
                    href="https://textualgames.com"
                    className="text-primary hover:underline"
                  >
                    https://textualgames.com
                  </Link>
                </p>
              </div>
            </div>
          </section>

          <section className="border-t pt-8">
            <p className="text-sm text-muted-foreground text-center">
              By using Textual Games, you acknowledge that you have read and
              understood this Privacy Policy and agree to the collection, use,
              and disclosure of your information as described herein.
            </p>
          </section>
        </CardContent>
      </Card>
    </main>
  );
}
