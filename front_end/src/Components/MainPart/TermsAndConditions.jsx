import React from 'react';
import logo from '../../logo.png'

export const TermsAndConditions = () => {
    return (
        <div class="d-flex justify-content-center m-3">
            <div class="border col-lg-6 shadow-lg" style={{borderRadius: "10px"}}>
                <header class=" d-flex justify-content-start mt-3">
                    <div>
                        <img src={logo} class="rounded d-block" width="70" height="70" alt="Not found" class="img-thumbnail" />
                    </div>
                    <div class="login-app-name-block ml-3">
                        Wilstodo
                    </div>
                </header>
                <hr />
                <div>
                    <h1 className="text-center">Terms & Conditions</h1>
                </div>

                <main>

                    <h3>Welcome to Wilstodo</h3>
                    <p>These terms of service outline the rules and regulations for the use of Wilstodo's Website.</p>


                    <p>By accessing this website we assume you accept these terms of service in full. Do not continue to use
                        Wilstodo's website if you do not accept all of the terms of service stated on this page.</p>
                    <p>The following terminology applies to these Terms of Service, Privacy Statement and Disclaimer Notice
                        and
                        any or all Agreements: "Client", "You" and "Your" refers to you, the person accessing this website
                        and accepting the Company's terms of service. "The Company", "Ourselves", "We", "Our" and "Us",
                        refers
                        to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves, or either the
                        Client
                        or ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to
                        undertake
                        the process of our assistance to the Client in the most appropriate manner, whether by formal
                        meetings
                        of a fixed duration, or any other means, for the express purpose of meeting the Client's needs in
                        respect
                        of provision of the Company's stated services/products, in accordance with and subject to,
                        prevailing law
                        of . Any use of the above terminology or other words in the singular, plural,
                        capitalisation and/or he/she or they, are taken as interchangeable and therefore as referring to
                        same.</p>

                    <h3>Cookies</h3>
                    <p>We employ the use of cookies. By using Wilstodo's website you consent to the use of cookies
                        in accordance with Wilstodo's privacy policy.</p>
                    <p>Most of the modern day interactive web sites
                        use cookies to enable us to retrieve user details for each visit. Cookies are used in some areas of
                        our site
                        to enable the functionality of this area and ease of use for those people visiting. Some of our
                        affiliate / advertising partners may also use cookies.</p>

                    <h3>Content Liability</h3>
                    <p>We shall have no responsibility or liability for any content appearing on your Web site. You agree to
                        indemnify
                        and defend us against all claims arising out of or based upon your Website. No link(s) may appear on
                        any
                        page on your Web site or within any context containing content or materials that may be interpreted
                        as
                        libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement
                        or
                        other violation of, any third party rights.</p>

                    <h3>Reservation of Rights</h3>
                    <p>We reserve the right at any time and in its sole discretion to request that you remove all links or
                        any particular
                        link to our Web site. You agree to immediately remove all links to our Web site upon such request.
                        We also
                        reserve the right to amend these terms of service and its linking policy at any time. By continuing
                        to link to our Web site, you agree to be bound to and abide by these linking terms of service.</p>
                    <h3>Credit &amp; Contact Information</h3>
                    <p>This Terms of service page was created at <a style={{ color: "inherit", textDecoration: "none", cursor: "text" }}
                        href="https://privacyterms.io/terms-conditions-generator/">privacyterms.io terms &amp;
                        conditions generator</a>. If you have
                        any queries regarding any of our terms, please contact us.</p>
                </main>
            </div>
        </div>
    )
}
