import Link from "next/link";

import { Button } from "@/components/ui/8bit/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/8bit/card";

export default function TermsOfService() {
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
            Terms of Service
          </CardTitle>
          <p className="text-center text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing and using Textual Games (&quot;the Service&quot;),
              you accept and agree to be bound by the terms and provision of
              this agreement. If you do not agree to abide by the above, please
              do not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              2. Description of Service
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Textual Games is an AI-powered platform that allows users to
              create and play interactive text-based adventure games. Our
              service includes:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
              <li>AI-generated story creation and character development</li>
              <li>Interactive text-based game experiences</li>
              <li>Character creation tools and customization options</li>
              <li>Game management and storage features</li>
              <li>Community features for sharing and discovering games</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              3. User Accounts and Registration
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                To access certain features of the Service, you must register for
                an account. You agree to:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  Provide accurate, current, and complete information during
                  registration
                </li>
                <li>
                  Maintain and update your account information to keep it
                  accurate
                </li>
                <li>Maintain the security of your password and account</li>
                <li>
                  Accept responsibility for all activities under your account
                </li>
                <li>
                  Notify us immediately of any unauthorized use of your account
                </li>
              </ul>
              <p>
                You must be at least 13 years old to create an account. Users
                under 18 must have parental consent.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              4. Subscription Plans and Payment
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <h3 className="text-xl font-medium text-foreground">Free Tier</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Limited number of games per month</li>
                <li>Basic character creation features</li>
                <li>Standard AI story generation</li>
              </ul>

              <h3 className="text-xl font-medium text-foreground">
                Pro Tier - $12/month
              </h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Unlimited game creation</li>
                <li>Advanced character customization</li>
                <li>Premium AI story generation</li>
                <li>Priority support</li>
              </ul>

              <p>
                Subscription fees are billed monthly in advance. You may cancel
                your subscription at any time through your account settings.
                Cancellation will take effect at the end of your current billing
                period.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              5. User-Generated Content
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                You retain ownership of the games, characters, and stories you
                create using our Service. However, by using the Service, you
                grant us a non-exclusive, royalty-free license to:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  Store, process, and display your content on our platform
                </li>
                <li>Use your content to provide and improve our services</li>
                <li>
                  Share your content with other users as intended by the
                  platform
                </li>
              </ul>

              <h3 className="text-xl font-medium text-foreground">
                Content Guidelines
              </h3>
              <p>You agree not to create content that:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Contains illegal, harmful, or offensive material</li>
                <li>Violates intellectual property rights of others</li>
                <li>Contains hate speech, harassment, or discrimination</li>
                <li>Includes personal information of others without consent</li>
                <li>Contains malware, viruses, or harmful code</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              6. AI Technology and Usage
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Our Service uses artificial intelligence to generate stories,
                characters, and game content. You understand and agree that:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  AI-generated content may not always be accurate or appropriate
                </li>
                <li>
                  You are responsible for reviewing and moderating AI-generated
                  content
                </li>
                <li>
                  We do not guarantee the quality, accuracy, or appropriateness
                  of AI-generated content
                </li>
                <li>AI responses may vary and are not always consistent</li>
                <li>
                  We reserve the right to improve and update our AI models
                  without notice
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              7. Privacy and Data Collection
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                We collect and process personal information as described in our
                Privacy Policy. This includes:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Account information (email, username)</li>
                <li>Game content and character data</li>
                <li>Usage analytics and performance data</li>
                <li>
                  Payment information (processed securely by third-party
                  providers)
                </li>
              </ul>
              <p>
                We use this information to provide, improve, and maintain our
                Service. We do not sell your personal information to third
                parties.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              8. Intellectual Property Rights
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                The Service and its original content, features, and
                functionality are owned by Textual Games and are protected by
                international copyright, trademark, patent, trade secret, and
                other intellectual property laws.
              </p>
              <p>
                You may not copy, modify, distribute, sell, or lease any part of
                our Service or included software, nor may you reverse engineer
                or attempt to extract the source code of that software.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Prohibited Uses</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>You may not use our Service:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  For any unlawful purpose or to solicit others to perform
                  unlawful acts
                </li>
                <li>
                  To violate any international, federal, provincial, or state
                  regulations, rules, laws, or local ordinances
                </li>
                <li>
                  To infringe upon or violate our intellectual property rights
                  or the intellectual property rights of others
                </li>
                <li>
                  To harass, abuse, insult, harm, defame, slander, disparage,
                  intimidate, or discriminate
                </li>
                <li>To submit false or misleading information</li>
                <li>
                  To upload or transmit viruses or any other type of malicious
                  code
                </li>
                <li>
                  To spam, phish, pharm, pretext, spider, crawl, or scrape
                </li>
                <li>For any obscene or immoral purpose</li>
                <li>
                  To interfere with or circumvent the security features of the
                  Service
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              10. Service Availability
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                We strive to maintain high service availability but cannot
                guarantee uninterrupted access. The Service may be temporarily
                unavailable due to:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Scheduled maintenance and updates</li>
                <li>Technical difficulties or system failures</li>
                <li>Third-party service disruptions</li>
                <li>Force majeure events</li>
              </ul>
              <p>
                We reserve the right to modify, suspend, or discontinue the
                Service at any time with reasonable notice.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              11. Limitation of Liability
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                In no event shall Textual Games, nor its directors, employees,
                partners, agents, suppliers, or affiliates, be liable for any
                indirect, incidental, special, consequential, or punitive
                damages, including without limitation, loss of profits, data,
                use, goodwill, or other intangible losses, resulting from your
                use of the Service.
              </p>
              <p>
                Our total liability to you for any damages arising from or
                related to these Terms or the Service shall not exceed the
                amount you paid us in the 12 months preceding the claim.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">12. Termination</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                We may terminate or suspend your account and bar access to the
                Service immediately, without prior notice or liability, under
                our sole discretion, for any reason whatsoever and without
                limitation, including but not limited to a breach of the Terms.
              </p>
              <p>
                You may terminate your account at any time by contacting us or
                using the account deletion feature in your settings. Upon
                termination, your right to use the Service will cease
                immediately.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              13. Changes to Terms
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                We reserve the right, at our sole discretion, to modify or
                replace these Terms at any time. If a revision is material, we
                will provide at least 30 days notice prior to any new terms
                taking effect.
              </p>
              <p>
                Your continued use of the Service after any such changes
                constitutes your acceptance of the new Terms.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">14. Governing Law</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                These Terms shall be interpreted and governed by the laws of the
                jurisdiction in which Textual Games operates, without regard to
                its conflict of law provisions.
              </p>
              <p>
                Any disputes arising from these Terms or your use of the Service
                shall be resolved through binding arbitration or in the courts
                of competent jurisdiction.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              15. Contact Information
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                If you have any questions about these Terms of Service, please
                contact us at:
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <p>
                  <strong>Email:</strong>{" "}
                  <Link href="mailto:theorcdev@gmail.com">
                    theorcdev@gmail.com
                  </Link>
                </p>
                <p>
                  <strong>Website:</strong>{" "}
                  <Link href="https://textualgames.com">
                    https://textualgames.com
                  </Link>
                </p>
              </div>
            </div>
          </section>

          <section className="border-t pt-8">
            <p className="text-sm text-muted-foreground text-center">
              By using Textual Games, you acknowledge that you have read and
              understood these Terms of Service and agree to be bound by them.
            </p>
          </section>
        </CardContent>
      </Card>
    </main>
  );
}
