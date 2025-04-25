import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Container from "@/components/ui/Container";
import { ArrowLeft } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - Cointegrity</title>
        <meta name="description" content="Privacy Policy for Cointegrity - Learn how we protect and handle your data" />
      </Helmet>
      
      <div className="min-h-screen bg-white py-12">
        <Container>
          <div className="max-w-4xl mx-auto">
            <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
            
            <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
              <p className="font-medium">Information on data processing pursuant to Articles 13 and 14 of the General Data Protection Regulation (GDPR)</p>
              
              <p>Protecting your personal data is of particular concern to us. We process your personal data (hereinafter "data") exclusively in accordance with legal regulations. With this privacy policy, we aim to provide you with comprehensive information about the processing of your data in our company and your data protection rights and claims.</p>

              <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">1. Who is responsible for data processing and whom can you contact?</h2>
              
              <p className="font-bold">Cointegrity</p>
              
              <p>Bolette Brygge 1, 0252 Oslo, Norway | [Company registration number] | [VAT number]</p>
              
              <p>E: hello@cointegrity.io | www.cointegrity.io</p>

              <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">2. What data is processed and from which sources does this data originate?</h2>
              
              <p>We process the data we receive from you in the context of business initiation and relationships. Additionally, we process data obtained from credit agencies, credit protection associations, publicly available sources (e.g., commercial register, association register, land register, media), and other companies with whom we have a permanent business relationship, in accordance with applicable law.</p>
              
              <p>The personal data includes:</p>
              
              <p>Your master/contact data such as:</p>
              
              <ul className="list-disc pl-6 mb-4">
                <li>For private customers: first and last name, address, contact details (email address, telephone number, fax), date of birth, data from presented proof of identity (copy of identification), bank details</li>
                
                <li>For corporate customers: company name, commercial register number, VAT number, operational number, address, contact person contact details (email address, telephone number, fax), bank details</li>
              </ul>
              
              <p>In addition, we also process the following other personal data:</p>
              
              <ul className="list-disc pl-6 mb-4">
                <li>Information about the nature and content of our business relationship such as contract data, order data, sales and document data, customer and supplier history, consulting documents, information about your financial status (e.g., credit data),</li>
                
                <li>Advertising and sales data, documentation data (e.g., consultation protocols), image data, information from your electronic communication with us (e.g., IP address, login data), other data that we have received from you in the course of our business relationship (e.g., in customer discussions), data that we generate ourselves from master/contact data and other data, such as through customer needs and potential analyses.</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">3. For what purposes and on what legal basis is the data processed?</h2>
              
              <p>We process your data in accordance with the provisions of the General Data Protection Regulation (GDPR) and the applicable Data Protection Act in its currently valid version:</p>
              
              <ul className="list-disc pl-6 mb-4">
                <li>To fulfill (pre-)contractual obligations (Art. 6 para. 1 lit. b GDPR): The processing of your data is carried out for the sale and distribution of our goods and services, for procurement and logistics purposes, as well as for customer administration and analysis. The data is processed in particular during business initiation and during the performance of contracts with you.</li>
                
                <li>To fulfill legal obligations (Art. 6 para. 1 lit. c GDPR): Processing of your data is necessary to fulfill various legal obligations, e.g., under the Commercial Code or the Federal Fiscal Code, anti-money laundering regulations, and other applicable laws.</li>
                
                <li>To safeguard legitimate interests (Art. 6 para. 1 lit. f GDPR): Based on a balance of interests, data processing may go beyond the actual fulfillment of the contract to safeguard legitimate interests of ours or third parties. In any case, data processing to safeguard legitimate interests occurs in the following cases:
                  <ul className="list-disc pl-6 mt-2 space-y-2">
                    <li>Consultation with and data exchange with credit agencies and credit protection associations to determine creditworthiness data;</li>
                    
                    <li>Advertising or marketing;</li>
                    
                    <li>Measures for business management and further development of services and products;</li>
                    
                    <li>Measures to protect our company from contractually or legally prohibited behavior, e.g., access controls;</li>
                    
                    <li>As part of legal action.</li>
                  </ul>
                </li>
              </ul>
              
              <p>With your consent (Art. 6 para. 1 lit. a GDPR):</p>
              
              <p>If you have given us consent to process your data, processing will only be carried out in accordance with the purposes specified in the declaration of consent and to the extent agreed therein. Consent given can be revoked at any time with future effect, e.g., for sending our newsletter or for data transmission to third parties. This does not affect the lawfulness of data processing prior to revocation. Please contact our email address provided in point 1 for this purpose.</p>

              <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">4. Who receives your data?</h2>
              
              <p>Even if we commission contract processors, we remain responsible for the protection of your data. All contract processors are contractually obliged to treat your data confidentiality and to process it only within the scope of service provision. The contract processors commissioned by us receive your data if they require the data to fulfill their respective service. These include IT service providers that we need for the operation and security of our IT system, as well as advertising and address publishers for our own advertising campaigns.</p>
              
              <p>For the purposes of company-related and individual advertising/customer support, your data will be transferred to our own subsidiaries and to other companies with whom we have a permanent business relationship with your consent.</p>
              
              <p>For the purpose of creditor protection, we transfer master data and information about your financial status to credit insurance companies, credit protection associations, and credit agencies.</p>
              
              <p>In the event of a legal obligation and within the scope of legal action, authorities and courts as well as external auditors may be recipients of your data.</p>
              
              <p>Furthermore, for the purpose of initiating and fulfilling contracts, insurance companies, banks, credit agencies, and service providers may be recipients of your data.</p>
              
              <p>When you contact us (via contact form or email), your information is processed to handle and respond to your contact request in accordance with Art. 6 para. 1 lit. b) GDPR. To efficiently address and respond to your inquiries, we have integrated our contact form with our Customer Relationship Management (CRM) tool, Pipedrive. The data you submit through the form is transmitted to Pipedrive and stored on Pipedrive's servers.</p>
              
              <p>We utilize the CRM system Pipedrive, provided by Pipedrive OÜ, based on our legitimate interests (efficient and rapid processing of user inquiries, customer management, and new business). Pipedrive OÜ is a private limited company established under the laws of the Republic of Estonia, with its address at Paldiski mnt 80, Tallinn, 10617, Estonia, registered in the Estonian Commercial Register under code 11958539, and is a subsidiary of Pipedrive US.</p>
              
              <p>We have entered into a contract with Pipedrive that includes standard contractual clauses, which obligate Pipedrive to process user data solely according to our instructions and to adhere to the EU's data protection standards. Additionally, Pipedrive US is certified under the Privacy Shield Agreement, offering an additional guarantee of compliance with European data protection law.</p>
              
              <p>Your data will be deleted from our CRM tool Pipedrive once your request has been processed and the purpose of storage no longer applies, provided there are no other legal exceptions. You can request information about the data stored about you at any time.</p>
              
              <p>For more detailed information on data protection, the storage duration of cookies, and the cookies used, please visit: <a href="https://www.pipedrive.com/en/privacy" className="text-blue-600 hover:text-blue-800">https://www.pipedrive.com/en/privacy</a>.</p>

              <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">5. How long will your data be stored?</h2>
              
              <p>We process your data until the end of the business relationship or until the expiry of the applicable warranty, guarantee, limitation, and statutory retention periods; furthermore, until the end of any legal disputes in which the data is needed as evidence.</p>

              <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">6. What data protection rights do you have?</h2>
              
              <p>You have the right to information, correction, deletion, or restriction of the processing of your stored data at any time, a right of objection to the processing, as well as a right to data portability and to lodge a complaint in accordance with the requirements of data protection law.</p>
              
              <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">6.1 Right to information:</h3>
              
              <p>You can request information from us as to whether and to what extent we process your data.</p>
              
              <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">6.2 Right to rectification:</h3>
              
              <p>If we process your data that is incomplete or incorrect, you can request the correction or completion of it at any time.</p>
              
              <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">6.3 Right to erasure:</h3>
              
              <p>You can request the deletion of your data from us if we process it unlawfully or if the processing disproportionately interferes with your legitimate interests. Please note that there may be reasons that prevent immediate deletion, e.g., in the case of legally regulated retention obligations.</p>
              
              <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">6.4 Right to restrict processing:</h3>
              
              <p>You can request us to restrict the processing of your data if:</p>
              
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>You dispute the accuracy of the data for a period that allows us to verify the accuracy of the data.</li>
                
                <li>the processing of the data is unlawful, but you refuse to delete it and instead request the restriction of data use,</li>
                
                <li>we no longer need the data for the intended purpose, but you need it to assert or defend legal claims, or</li>
                
                <li>you have objected to the processing of the data.</li>
              </ul>
              
              <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">6.5 Right to data portability:</h3>
              
              <p>You can request us to provide you with the data you have provided us in a structured, common, and machine-readable format and to allow you to transfer this data to another controller without hindrance on our part, provided that:</p>
              
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>we process this data based on a consent given and revocable by you or for the fulfillment of a contract between us, and</li>
                
                <li>this processing is carried out using automated procedures.</li>
              </ul>
              
              <p>If technically feasible, you can request that we transfer your data directly to another controller.</p>
              
              <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">6.6 Right to object to processing:</h3>
              
              <p>If we process your data for legitimate interest, you can object to this data processing at any time; this would also apply to profiling based on these provisions. We will then no longer process your data unless we can demonstrate compelling legitimate grounds for processing that outweigh your interests, rights, and freedoms, or the processing serves to assert, exercise, or defend legal claims. You can object to the processing of your data for the purpose of direct advertising without giving reasons.</p>
              
              <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">6.7 Right to lodge a complaint:</h3>
              
              <p>If you believe that the processing of your data violates data protection law, please contact us to clarify any questions. Of course, you also have the right to contact the relevant data protection authority.</p>

              <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">7. Are you required to provide data?</h2>
              
              <p>The processing of your data is generally necessary to enter into or fulfill a contract with us. If you do not provide us with this data, we will generally have to refuse to conclude the contract or be unable to execute it and terminate the existing relationship. However, you are not obliged to give your consent to the processing of data that is not relevant to the performance of the contract or is not required by law.</p>

              <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">8. To what extent is there automated decision-making (including profiling)?</h2>
              
              <p>In principle, we do not use fully automated decision-making pursuant to Article 22 GDPR to establish and implement the business relationship. If we use these procedures in individual cases, we will inform you of this separately, provided this is required by law.</p>

              <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">9. To what extent does your data help to make decisions in individual cases?</h2>
              
              <p>As part of our business relationship, we generally do not use any automated decision-making pursuant to Article 22 GDPR. Should we use these procedures in individual cases, we will inform you of this separately, provided this is required by law.</p>

              <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">10. Will the personal data be transferred to a third country?</h2>
              
              <p>In principle, we do not transfer any data to a third country. In individual cases, data is only transferred on the basis of an adequacy decision by the European Commission, standard contractual clauses, suitable guarantees or your explicit consent.</p>

              <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">11. Application Data</h2>
              
              <p>If you send us your application, your application data will only be made accessible to authorized persons involved in the application process. Your application data will be stored for a maximum of two years, also in order to be able to offer you alternative positions if necessary.</p>

              <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">12. Changes to this privacy policy</h2>
              
              <p>We will revise this privacy policy as necessary, e.g., when changes in our data processing occur. You can find the latest version of the privacy policy on our website.</p>

              <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">13. Cookies and Tracking Tools</h2>
              
              <p>Our website uses so-called cookies. These are small text files that are stored on your end device with the help of the browser. They do not cause any damage. We use cookies to make our website more user-friendly. Some cookies remain stored on your device until you delete them. They enable us to recognize your browser on your next visit.</p>
              
              <p>If you do not want this, you can set up your browser so that it informs you about the setting of cookies and you only allow this in individual cases.</p>
              
              <p>If you deactivate cookies, the functionality of our website may be restricted.</p>
              
              <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">13.1 What types of cookies do we use?</h3>
              
              <p>There are a number of different types of cookies, however, our website uses:</p>
              
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Functionality – We use these cookies so that we recognize you on our website and remember your previously selected preferences. These could include what language you prefer and location you are in. A mix of first-party and third-party cookies are used.</li>
                
                <li>Advertising – We use these cookies to collect information about your visit to our website, the content you viewed, the links you followed and information about your browser, device, and your IP address. Our Company sometimes shares some limited aspects of this data with third parties for advertising purposes. We may also share online data collected through cookies with our advertising partners. This means that when you visit another website, you may be shown advertising based on your browsing patterns on our website.</li>
              </ul>
              
              <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">13.2 Tracking Tools and Use of Google Analytics</h3>
              
              <p>Our website uses analysis tools to collect general information about the usage behavior of visitors. This includes, for example, pages viewed, length of visit, referring pages and general information about your computer system such as operating system, screen resolution, browser used, etc. All data collected is stored anonymously and cannot be traced back to you personally. If you do not agree with this anonymized collection of your usage behavior, you can prevent this by deactivating cookies in your browser.</p>
              
              <p>This website also uses Google Analytics, an internet analysis service from Google. Google Analytics uses cookies to help the website analyze how users use the site.</p>
              
              <p>The information generated by the cookies about your use of the website (including your IP address) will be transmitted to and stored by Google on servers in the United States. Google will use this information for the purpose of evaluating your use of the website, compiling reports on website activity and providing other services relating to website activity and internet usage. Google may also transfer this information to third parties where required to do so by law, or where such third parties process the information on Google's behalf. You may refuse the use of cookies by selecting the appropriate settings on your browser, however please note that if you do this you may not be able to use the full functionality of this website. By using this website, you consent to the processing of data about you by Google in the manner and for the purposes set out above.</p>
              
              <p>We would like to inform you that this website uses Google Analytics exclusively by means of a deactivation add-on "_anonymizeIp()". Your IP address is not stored in full. The identification of the visitor to the website is excluded.</p>
              
              <p>By installing the browser add-on to deactivate Google Analytics (<a href="http://tools.google.com/dlpage/gaoptout?hl=en" className="text-blue-600 hover:text-blue-800">http://tools.google.com/dlpage/gaoptout?hl=en</a>), you can object to its use. By doing so, you inform Google Analytics that no information about the website visit should be transmitted to Google Analytics. Without your express consent, we will not use tracking tools to:</p>
              
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>collect personal data about you,</li>
                
                <li>transmit such data to third-party providers and marketing platforms, or</li>
                
                <li>link the data with your personal data (name, address, etc.).</li>
              </ul>
              
              <p>The browser add-on to deactivate Google Analytics is compatible with Chrome, Internet Explorer 8-11, Safari, Firefox and Opera.</p>

              <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">14. Use of social sharing</h2>
              
              <p>We do not use any plugins from the respective social media services for the social sharing functionalities. Instead, we only use a text or image link. This means that no data, such as your IP address, browser used, screen resolution, the website accessed, date and time, is transmitted to the respective social media services.</p>
              
              <p>Such links may look like this: www.facebook.com/sharer/sharer.php</p>
              
              <p>If you click on a social sharing link while you are logged into your respective social media account, you can share the content of our pages on your profile. This allows the social media service to associate your visit to our pages with your user account. We would like to point out that, as the provider of the pages, we have no knowledge of the content of the transmitted data or its use by social media platforms.</p>

              <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">15. Contact via website</h2>
              
              <p>Due to legal regulations, our website contains information that enables quick electronic contact to our company and direct communication with us, which also includes a general address for so-called electronic mail (e-mail address). If a data subject contacts the controller by email or via a contact form, the personal data transmitted by the data subject will be stored automatically. Such personal data transmitted on a voluntary basis by a data subject to the controller are stored for the purposes of processing or contacting the data subject. This personal data is not passed on to third parties.</p>
              
              <p>We use Supabase for our contact form and for sending emails. Supabase helps us manage and store the data you submit through our contact form securely. When you submit information through our contact form, this data is processed and stored on Supabase's servers. Supabase implements strong security measures to protect your data, and we have a data processing agreement in place with them to ensure compliance with GDPR requirements.</p>

              <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">16. Embedding of YouTube videos</h2>
              
              <p>We use the so-called "extended data protection mode" of the provider YouTube to embed videos. This means that a cookie is only stored on your computer when the video is played. According to YouTube, however, no personal cookie information is stored for playbacks of embedded videos with extended data protection. Further information on YouTube's official data protection policy can be found here: <a href="https://www.google.com/intl/en/policies/privacy/" className="text-blue-600 hover:text-blue-800">https://www.google.com/intl/en/policies/privacy/</a>.</p>
              
              <p>If you want to ensure that no data about you is stored by YouTube, do not click on the embedded videos.</p>

              <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">17. Use of Google reCaptcha</h2>
              
              <p>We use the reCAPTCHA service from Google Inc (Google) to protect your orders via the Internet form. The query serves to differentiate whether the input is made by a human or abusively by automated, machine processing. The query includes sending the IP address and any other data required by Google for the reCAPTCHA service to Google. For this purpose, your input is transmitted to Google and used there. By using reCaptcha, you agree that the recognition you provide will be used to digitize old works. However, if IP anonymization is activated on this website, your IP address will be shortened by Google beforehand within member states of the European Union or in other contracting states of the Agreement on the European Economic Area. Only in exceptional cases will the full IP address be transmitted to a Google server in the USA and shortened there. Google will use this information on behalf of the operator of this website to evaluate your use of this service. The IP address transmitted by your browser as part of reCaptcha will not be merged with other Google data. The deviating data protection provisions of Google apply to this data. You can find more information about Google's privacy policy at: <a href="https://www.google.com/intl/en/policies/privacy/" className="text-blue-600 hover:text-blue-800">https://www.google.com/intl/en/policies/privacy/</a>.</p>

              <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">18. Use of Google Maps</h2>
              
              <p>This website uses the "Google Maps API" of Google Inc (Google) for the visual display of maps. When Google Maps is used, Google also collects, processes and uses data about the use of the Maps functions by visitors to the website. The terms of use for Google Maps can be found at Terms of Use for Google Maps. Further information on Google's privacy policy can be found at: <a href="https://www.google.com/intl/en/policies/privacy/" className="text-blue-600 hover:text-blue-800">https://www.google.com/intl/en/policies/privacy/</a>.</p>

              <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">19. Google Tag Manager</h2>
              
              <p>This website uses Google Tag Manager. This service allows website tags to be managed via an interface. The Google Tool Manager only implements tags. This means that no cookies are used and no personal data is collected. The Google Tool Manager triggers other tags, which in turn may collect data. However, the Google Tag Manager does not access this data. If deactivation has been carried out at domain or cookie level, it remains in place for all tracking tags, provided that these are implemented with the Google Tag Manager.</p>
              
              <p className="mt-8 text-sm text-gray-500">(Status: April 2025)</p>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default PrivacyPolicy;
