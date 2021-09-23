import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../logo.png'

export const PrivacyPolicy = () => {
    return (
        <div class="d-flex justify-content-center m-3">
            <div class="border col-lg-6 shadow-lg" style={{borderRadius: "10px"}}>
                <header class=" d-flex justify-content-start mt-3">
                    <div>
                        <img src={logo} class="rounded d-block" width="70" height="70"
                            alt="Not found" class="img-thumbnail" />
                    </div>
                    <div class="login-app-name-block ml-3">
                        Wilstodo
                    </div>
                </header>
                <hr />
                <main>
                    <h1 class="text-center">Privacy Policy</h1>
                    <p><strong>Effective Date: 29-01-2021</strong></p>
                    <h3>Your privacy is important to us</h3>


                    <p>It is Wilstodo's policy to respect your privacy regarding any information we may collect while
                        operating our website. This Privacy Policy applies to <Link to="https://www.wilstodo.com" target="_blank">
                            www.wilstodo.com</Link> (hereinafter, "us", "we", or "www.wilstodo.com"). We respect your privacy
                        and are committed to protecting personally identifiable information you may provide us through the
                        Website. We have adopted this privacy policy ("Privacy Policy") to explain what information may be
                        collected on our Website, how we use this information, and under what circumstances we may disclose
                        the information to third parties. This Privacy Policy applies only to information we collect through
                        the Website and does not apply to our collection of information from other sources.</p>
                    <p>This Privacy Policy, together with the Terms of service posted on our Website, set forth the general
                        rules and policies governing your use of our Website. Depending on your activities when visiting our
                        Website, you may be required to agree to additional terms of service.</p>
                    <h2 id="tableofcontents">Contents</h2>
                    <p>Click below to jump to any section of this privacy policy</p>
                    <ol type="1">
                        <li><Link to="#PII"><strong>Personally-Identifying Information</strong></Link>
                        </li>
                        <li><Link to="#Security"><strong>Security</strong></Link>
                        </li>
                        <li><Link to="#Ads"><strong>Advertisements</strong></Link>
                        </li>
                        <li><Link to="#Cookies"><strong>Cookies</strong></Link>
                        </li>
                        <li><Link to="#Changes"><strong>Privacy Policy Changes</strong></Link>
                        </li>
                        <li><Link to="#Credit"><strong>Contact Information &amp; Credit</strong></Link>
                        </li>

                    </ol>
                    <h2 id="PII">1. Personally-Identifying Information</h2>
                    <p>Certain visitors to Wilstodo's websites choose to interact with Wilstodo in ways that require
                        Wilstodo to gather personally-identifying information. The amount and type of information that
                        Wilstodo gathers depends on the nature of the interaction. For example, we ask visitors who leave a
                        comment at https://www.wilstodo.com to provide a username and email address.</p>

                    <p><Link to="#tableofcontents">Back to table of contents</Link></p>
                    <h2 id="Security">2. Security</h2>
                    <p>The security of your Personal Information is important to us, but remember that no method of
                        transmission over the Internet, or method of electronic storage is 100% secure. While we strive to
                        use commercially acceptable means to protect your Personal Information, we cannot guarantee its
                        absolute security.</p>

                    <p><Link to="#tableofcontents">Back to table of contents</Link></p>
                    <h2 id="Ads">3. Advertisements</h2>
                    <p>Ads appearing on our website may be delivered to users by advertising partners, who may set cookies.
                        These cookies allow the ad server to recognize your computer each time they send you an online
                        advertisement to compile information about you or others who use your computer. This information
                        allows ad networks to, among other things, deliver targeted advertisements that they believe will be
                        of most interest to you. This Privacy Policy covers the use of cookies by Wilstodo and does not
                        cover the use of cookies by any advertisers.</p>

                    <p><Link to="#tableofcontents">Back to table of contents</Link></p>
                    <h2 id="Cookies">4. Cookies</h2>
                    <p>To enrich and perfect your online experience, Wilstodo uses "Cookies", similar technologies and
                        services provided by others to display personalized content, appropriate advertising and store your
                        preferences on your computer.</p>
                    <p>A cookie is a string of information that a website stores on a visitor's computer, and that the
                        visitor's browser provides to the website each time the visitor returns. Wilstodo uses cookies to
                        help Wilstodo identify and track visitors, their usage of https://www.wilstodo.com, and their
                        website access preferences. Wilstodo visitors who do not wish to have cookies placed on their
                        computers should set their browsers to refuse cookies before using Wilstodo's websites, with the
                        drawback that certain features of Wilstodo's websites may not function properly without the aid of
                        cookies.</p>
                    <p>By continuing to navigate our website without changing your cookie settings, you hereby acknowledge
                        and agree to Wilstodo's use of cookies.</p>

                    <p><Link to="#tableofcontents">Back to table of contents</Link></p>
                    <h2 id="Changes">5. Privacy Policy Changes</h2>
                    <p>Although most changes are likely to be minor, Wilstodo may change its Privacy Policy from time to
                        time, and in Wilstodo's sole discretion. Wilstodo encourages visitors to frequently check this page
                        for any changes to its Privacy Policy. Your continued use of this site after any change in this
                        Privacy Policy will constitute your acceptance of such change.</p>

                    <p><Link to="#tableofcontents">Back to table of contents</Link></p>
                    <h2 id="Credit">6. Contact Information &amp; Credit</h2>
                    <p>This privacy policy was created at <Link style={{color: "inherit", textDecoration: "none"}}
                        to="https://privacyterms.io/privacy-policy-generator/" title="Privacy policy generator"
                        target="_blank">privacyterms.io privacy policy generator</Link>. If you have any questions about
                        our Privacy Policy, please contact us via <Link to="mailto:wilstodo@gmail.com">email</Link> or <Link
                            to="tel:">phone</Link>.</p>

                    <p><Link to="#tableofcontents">Back to table of contents</Link></p>
                </main>
            </div>
        </div>
    )
}
