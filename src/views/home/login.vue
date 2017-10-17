<template>
  <div>
    <div class="head ui-bc-fff">
      <div class="page-center ub ub-ac">
        <span class="ic-logo cursor-click" @click="$router.push({'path':'/index'})"></span>
        <div class="ub ub-ae ui-hp ui-pl-16 ui-pb-32">
          <span class="f-30 main-color">{{$t('login.welcomeToLogin')}}</span>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="page-center">
        <div class='login-box' :class="{'my_login':$i18n.locale == 'my'}">
          <div class="show-item near-center">
            <div class="login-btn cu-po" :class='{"act": loginView}' @click="changeView(true)">{{$t('head.logIn')}}</div>
            <div class="register-btn cu-po" :class='{"act": !loginView}' @click="changeView(false)">{{$t('head.registered')}}</div>
          </div>
          <div class="login-tip ub ub-ac ic-error" :class='{"ui-vh": errTip ==""}'>
            <span></span>
            <div v-html='errTip'></div>
          </div>
          <form class="login" v-show="loginView">
            <div class="inputBox" :class="{'getFocus':loginEmailFocus}">
              <label class="ic-email"></label>
              <input type="text" @focus="loginEmailFocus =true" v-model="loginData.email" @blur="emailVerification();loginEmailFocus = false" :placeholder="$t('login.email')" />
              <span class="state ic-delete cu-po" :class="{'selected':loginEmailFocus}" v-show="loginData.email.length > 0" @click="loginData.email = ''"></span>
            </div>
            <div class="inputBox" :class="{'getFocus':loginPassFocus}">
              <label class="ic-pwd"></label>
              <input type="password" @keyup.13="login" @focus="loginPassFocus =true" @blur="pwdVerification();loginPassFocus = false" v-model="loginData.pwd" :placeholder="$t('login.password')" />
              <span class="state ic-delete cu-po" :class="{'selected':loginPassFocus}" v-show="loginData.pwd.length > 0" @click="loginData.pwd = ''"></span>
            </div>
            <div class="bc-do-btn" id="login" @click="login()">{{$t(loginBut)}}</div>
            <div class="b-operate near-center">
              <div class="cu-po" @click="$router.push('/forget')">{{$t('login.forgetPassword')}}</div>
              <div class="cu-po" @click="loginView = false">{{$t('login.registerAnAccount')}}</div>
            </div>
          </form>
          <form class="register" v-show="!loginView" data-vv-scope="register">
            <div class="inputBox" :class="{'getFocus':nameFocus}">
              <input type="text" @focus="nameFocus =true" @blur="nameVerification();nameFocus = false" v-model="registerData.username" :placeholder="$t('login.username')" />
              <span class="state" :class="{'ic-true': VerificationState.username == 3}"></span>
            </div>
            <div class="inputBox" :class="{'getFocus':emailFocus}">
              <input type="text" @focus="emailFocus =true" @blur="emailVerification();emailFocus = false" v-model="registerData.email" :placeholder="$t('login.email')" />
              <span class="state" :class="{'ic-true': VerificationState.email == 3}"></span>
            </div>
            <div class="inputBox" :class="{'getFocus':codeFocus}">
              <input type="text" @focus="codeFocus =true" v-model="registerData.code" :placeholder="$t('login.verificationCode')" @blur="codeVerification();codeFocus = false" />
              <div class="get-code bc-do-btn" @click="getCode()">
                {{codeS}}{{this.$t(codeText)}}
              </div>
            </div>
            <div class="inputBox" :class="{'getFocus':passFocus}">
              <input type="password" @keyup.13="register" @focus="passFocus =true" @blur="pwdVerification();passFocus = false" v-model="registerData.pwd" :placeholder="$t('login.password')" />
              <span class="state" :class="{'ic-true': VerificationState.pwd == 3}"></span>
            </div>
            <div class="bc-do-btn" :class="{'ui-bc-ccc': !affirm}" id="register" @click="register()">{{$t('login.signUpNow')}}</div>
            <div class="login-tip tip-box-affirm ub ub-ac">
              <span class="ic-affirm" :class="{'not': !affirm}" @click="affirm = !affirm"></span>
              <span>{{$t('login.IHaveReadAndAgreed')}}</span>
              <span class="main-color c-o-hover" @click="rulesView= true">《{{$t('login.userTermsOfService')}}》</span>
            </div>
          </form>
        </div>
      </div>

    </div>
    <div class="layer-box ub ub-ac ub-pc" v-show="rulesView">
      <div class="user-agreement">
        <div class="box-title" v-if="$i18n.locale == 'zh_CN'">
          <p>TPI用户服务协议</p>
          <span @click="rulesView = false">×</span>
        </div>
        <div class="box-title" v-if="$i18n.locale == 'en'">
          <p>TPI User Service Agreement</p>
          <span @click="rulesView = false">×</span>
        </div>
        <div class="box-title" v-if="$i18n.locale == 'th'">
          <p>ข้อตกลงในการให้บริการผู้ใช้ TPI</p>
          <span @click="rulesView = false">×</span>
        </div>
        <div class="box-title" v-if="$i18n.locale == 'lo'">
          <p>ສັນຍາກ່ຽວກັບບໍລິການຜູ້ໃຊ້ TPI</p>
          <span @click="rulesView = false">×</span>
        </div>
        <div class="box-title" v-if="$i18n.locale == 'my'">
          <p>TPI အသံုးျပဳသူ၀န္ေဆာင္မွဳမ်ားသေဘာတူညီခ်က</p>
          <span @click="rulesView = false">×</span>
        </div>
        <div class="box-content" v-if="$i18n.locale == 'zh_CN'">
          <p class="b-c-title">TPI用户服务协议</p>
          <p>请务必认真阅读和理解本《用户服务协议》（以下简称《协议》）中规定的所有权利和限制。除非您接受本《协议》条款，否则您无权注册、登录或使用本协议所涉及的相关服务。您一旦注册、登录、使用或以任何方式使用本《协议》所涉及的相关服务将视为对 本《协议》的接受，即表示您同意接受本《协议》各项条款的约束。如果您不同意本《协议》中的条款，请不要注册、登录或使用本《协议》相关服务。 本《协议》是用户与TPI market place公司（下称“TPI”）之间的法律协议。</p>
          <p class="b-c-title">第1条 服务内容 </p>
          <p>
            <b>1.1您无需用户账户即可浏览本网站。</b>但某些网站功能和服务需要您注册TPI帐户，并且于注册页面上提供相关的个人信息。您可以按照网站说明随时终止使用您的账户，本网站将会依据本协议规定保留或终止您的账户。用户须对注册信息的真实性、合法性、有效性承担全部责任；用户不得冒充他人，不得利用他人的名义发布任何信息；不得恶意使用注册帐户导致其他用户误认；否则我们有权立即停止提供服务，您独自承担由此而产生的一切法律责任。 您使用本网站的行为必须合法，您必须为自己注册帐户下的一切行为负责，包括您所发表的任何内容以及由此产生的任何结果。用户应对其中的内容自行加以判断，并承担因使用内容而引起的所有风险，包括因对内容的正确性、完整性或实用性的依赖而产生的风险。TPI公司无法且不会对因用户行为而导致的任何损失或损害承担责任。 您对您的登录信息保密、不被其他人获取并使用且对您在本网站账户下的所有行为负责。您必须将任何有可能触犯法律的，未授权使用或怀疑为未授权使用的行为在第一时间通知本网站，本网站不对您因未能遵守上述要求而造成的损失承担责任。
          </p>
          <p>
            <b>1.2您必须知悉并确认：</b>我们因业务发展需要，单方面对本服务的全部或部分服务内容在任何时候不经任何通知的情况下变更、暂停、限制、终止或撤销我们服务的权利，用户需承担此风险。 我们提供的服务中可能包括广告等活动，用户同意在使用过程中显示我们及关联方与第三方供应商、合作伙伴提供的广告以及其他活动。 我们有权自行全权决定以任何理由，对违反有关法律法规或本协议约定；或侵犯、妨害、威胁任何人权利或安全的内容，或者假冒他人的行为，有权依法停止传输任何相关内容，并有权依其自行判断对违反本协议的任何人士采取适当的法律行动，包括但不限于，从服务中删除具有违法性、侵权性、不当性等内容，终止违反者的成员资格，阻止其使用我们全部或部分服务，并且依据法律法规保存有关信息并向有关部门报告等。
          </p>
          <p class="b-c-title">第2条 用户使用规则</p>
          <p>2.1 用户在申请使用TPI网站网络服务时，必须向TPI提供准确的个人资料，如个人资料有任何变动，必须及时更新。因用户提供个人资料不准确、不真实而引发的一切后果由用户承担。</p>
          <p>2.2 用户不应将其帐号、密码转让、出借、销售或以任何脱离用户控制的形式交由他人使用。如用户发现其帐号遭他人非法使用，应立即通知TPI。因黑客行为或用户的保管疏忽导致帐号、密码遭他人非法使用，TPI不承担任何责任。</p>
          <p>2.3 TPI帐号的所有权归TPI，用户完成注册申请手续后，获得TPI帐号的使用权。</p>
          <p>2.4 用户应当为自身注册帐户下的一切行为负责，因用户行为而导致的用户自身或其他任何第三方的任何损失或损害，TPI不承担责任。</p>
          <p>2.5 用户理解并接受TPI提供的服务中可能包括广告，同意在使用网络服务的过程中显示TPI和第三方供应商、合作伙伴提供的广告。</p>
          <p>
            <b>2.6 用户在使用TPI网络服务过程中，必须遵循以下原则：</b>
          </p>
          <p>2.6.1 遵守中国和泰国有关的法律和法规；</p>
          <p>2.6.2 遵守所有与网络服务有关的网络协议、规定和程序；</p>
          <p>2.6.3 不得为任何非法目的而使用网络服务系统；</p>
          <p>2.6.4 不得利用TPI网络服务系统进行任何可能对互联网或移动网正常运转造成不利影响的行为；</p>
          <p>2.6.5 不得侵犯TPI和其他任何第三方的专利权、著作权、商标权、名誉权或其他任何合法权益；</p>
          <p>2.6.6 不得利用TPI网络服务系统进行任何不利于TPI的行为；</p>
          <p>2.6.7 如发现任何非法使用用户账户或账户出现安全漏洞的情况，应立即通告TPI。</p>
          <p>2.8 如用户在使用网络服务时违反任何上述规定，TPI或其授权的人有权要求用户改正或直接采取一切必要的措施（包括但不限于更改或删除用户收藏的内容等、暂停或终止用户使用网络服务的权利）以减轻用户不当行为造成的影响。</p>
          <p class="b-c-title">第3条 用户信息</p>
          <p>3.1用户应自行诚信向本站提供注册资料，用户同意其提供的注册资料真实、准确、完整、合法有效，用户注册资料如有变动的，应及时更新其注册资料。如果用户提供的注册资料不合法、不真实、不准确、不详尽的，用户需承担因此引起的相应责任及后果，并且TPI保留终止用户使用TPI各项服务的权利。</p>
          <p>3.2用户在本站进行浏览、下单购物等活动时，涉及用户真实姓名/名称、通信地址、联系电话、电子邮箱等隐私信息的，本站将予以严格保密，除非得到用户的授权或法律另有规定，本站不会向外界披露用户隐私信息。</p>
          <p>3.3用户注册成功后，将产生用户名和密码等账户信息，您可以根据本站规定改变您的密码。用户应谨慎合理的保存、使用其用户名和密码。用户若发现任何非法使用用户账号或存在安全漏洞的情况，请立即通知本站并向公安机关报案。</p>
          <p>3.4用户不得将在本站注册获得的账户借给他人使用，否则用户应承担由此产生的全部责任，并与实际使用人承担连带责任。</p>
          <p class="b-c-title">第4条 知识产权</p>
          <p>4.1 TPI 提供的网络服务中包含的任何文本、图片、图形、资料均受版权、商标和/或其它财产所有权法律的保护，未经相关权利人同意，上述资料均不得用于任何商业目的。</p>
          <p>4.2 TPI 为提供网络服务而使用的任何软件（包括但不限于软件中所含的任何图像、照片、文字和附加程序、随附的帮助材料）的一切权利均属于该软件的著作权人，未经该软件的著作权人许可，用户不得对该软件进行反向工程（reverse engineer）、反向编译（decompile）或反汇编（disassemble）。</p>
          <p class="b-c-title">第5条 隐私保护</p>
          <p>5.1 保护用户隐私是TPI的一项基本政策，TPI保证不对外公开或向第三方提供单个用户的注册资料及用户在使用网络服务时存储在TPI的非公开内容，但下列情况除外：</p>
          <p>5.1.1 事先获得用户的明确授权；</p>
          <p>5.1.2 根据有关的法律法规要求；</p>
          <p>5.1.3 按照相关政府主管部门的要求；</p>
          <p>5.1.4 为维护社会公众的利益；</p>
          <p>5.1.5 为维护TPI的合法权益。</p>
          <p>5.2 在不透露单个用户隐私资料的前提下，TPI有权对整个用户数据库进行分析并对用户数据库进行商业上的利用。</p>
          <p class="b-c-title">第6条 配送</p>
          <p>6.1销售方将会把商品（货物）送到您所指定的收货地址，所有在本站上列出的送货时间为参考时间，参考时间的计算是根据库存状况、正常的处理过程和送货时间、送货地点的基础上估计得出的。</p>
          <p>6.2因如下情况造成订单延迟或无法配送等，销售方不承担延迟配送的责任：</p>
          <p>（1）用户提供的信息错误、地址不详细等原因导致的；</p>
          <p>（2）货物送达后无人签收，导致无法配送或延迟配送的；</p>
          <p>（3）情势变更因素导致的；</p>
          <p>（4）不可抗力因素导致的，例如：自然灾害、交通戒严、突发战争等</p>
          <p class="b-c-title">第7条 免责声明</p>
          <p>7.1 TPI不担保网络服务一定能满足用户的要求，也不担保网络服务不会中断，对网络服务的及时性、安全性、准确性也都不作担保。</p>
          <p>7.2 TPI 不保证为向用户提供便利而设置的外部链接的准确性和完整性，同时，对于该等外部链接指向的不由TPI实际控制的任何网页上的内容，TPI不承担任何责任。</p>
          <p>7.3 对于因互联网网络故障、计算机故障或病毒、信息损坏或丢失、计算机系统问题或其它任何不可抗力原因而产生损失，TPI不承担任何责任，但将尽力减少因此而给用户造成的损失和影响。</p>
          <p class="b-c-title">第8条 法律及争议解决</p>
          <p>本协议适用中华人民共和国法律。</p>
          <p class="b-c-title">第9条 其他</p>
          <p>9.1 TPI尊重用户和消费者的合法权利，本协议及本网站上发布的各类规则、声明等其他内容，均是为了更好的、更加便利的为用户和消费者提供服务。本站欢迎用户和社会各界提出意见和建议，TPI将虚心接受并适时修改本协议及本站上的各类规则。</p>
          <p>9.2本协议内容中以黑体、加粗、下划线、斜体等方式显著标识的条款，请用户着重阅读。</p>
          <p>9.3您点击本协议下方的;同意并继续;按钮即视为您完全接受本协议，在点击之前请您再次确认已知悉并完全理解本协议的全部内容。</p>
        </div>

        <div class="box-content" v-if="$i18n.locale == 'en'">
          <p class="b-c-title">TPI User Service Agreement</p>
          <p>Be sure to carefully read and understand all the rights and restrictions set forth in this User Service Agreement (the "Agreement"). You are not authorized to register, log in or use the services covered by this Agreement unless you accept the terms of this Agreement. You will be deemed to have accepted this Agreement once you have registered, registered, used or otherwise used in connection with this Agreement, and you agree to be bound by the terms of this Agreement. If you do not agree to the terms of this Agreement, please do not register, log in or use this Agreement. This Agreement is a legal agreement between the User and TPI market place (the "TPI").</p>
          <p class="b-c-title">Article 1 service content</p>
          <p>
            <b>1.1 You can browse this website without a user account.</b>But some of the site features and services require you to register your TPI account and provide relevant personal information on the registration page. You may terminate your use of the account at any time by following the instructions on this website, and this site will retain or terminate your account in accordance with the provisions of this Agreement. The user shall not assume any responsibility for the authenticity, legality and validity of the registered information; the user shall not pretend to be a person and shall not publish any information in the name of any other person; he shall not maliciously use the registered account to cause other users to misunderstand; otherwise we shall have the right to cease to provide Service, you are solely responsible for all the resulting legal liability. Your use of this website must be lawful and you must be responsible for all actions under your account, including any content you have published and any results resulting therefrom. The user shall determine the content itself and bear all the risks arising from the use of the content, including the risks arising from the reliance on the correctness, completeness or usefulness of the content. TPI Company shall not and will not be liable for any loss or damage resulting from User's Conduct. You are confidential to your login information and are not taken and used by others and are responsible for all actions under your account. You must notify the Site of any unauthorized use or suspicion of unauthorized use, and this website is not responsible for any loss caused by failure to comply with the above requirements.
          </p>
          <p>
            <b>1.2 You must be aware and confirm that:</b>We reserve the right to change, suspend, terminate, terminate or revoke our services without any notice of any or all of the services of the Service at any time due to business development. Our services may include advertising and other activities, the user agrees to use the process of showing us and related parties and third-party suppliers, partners, advertising and other activities. We have the right, at our sole discretion, to cease the transmission of any relevant content in accordance with the law, for any reason whatsoever for the breach of the relevant laws and regulations or the provisions of this Agreement; or the violation, obstruction, threat of any person's rights or security, or the impersonation of another person Have the right to, at its sole discretion, take appropriate legal action against any person who violates this Agreement, including, but not limited to, removing the contents of the offense from infringement, infringement, or inability, terminating the membership of the Violator, and preventing his use We maintain all or part of the service, and according to laws and regulations to save the relevant information and report to the relevant departments.
          </p>
          <p class="b-c-title">Article 2 user usage rules</p>
          <p>2.1 When applying for the use of the TPI web service, the user must provide the TPI with accurate personal information, such as any changes to the personal data, which must be updated in a timely manner. Due to the user to provide personal information is not accurate, untrue and all the consequences borne by the user.</p>
          <p>2.2 Users should not transfer their account numbers, passwords, lend, sell or use them in any form controlled by the user. If the user discovers that his or her account has been used illegally, the TPI should be notified immediately. The TPI does not assume any responsibility for the illegal use of the password by the hacker or the user's negligence.</p>
          <p>2.3 TPI account ownership of the TPI, the user to complete the registration application procedures, access to TPI account of the right to use.</p>
          <p>2.4 TPI shall not be liable for any loss or damage to the user's own or any other third party arising from the User's actions.</p>
          <p>2.5 The user understands and accepts the services provided by the TPI that may include advertisements, agreeing to display the ads provided by the TPI and third party vendors and partners during the use of the web service.</p>
          <p>
            <b>2.6 Users in the use of TPI network services, must follow the following principles:</b>
          </p>
          <p>2.6.1 Comply with laws and regulations relating to China and Thailand;</p>
          <p>2.6.2 Comply with all network protocols, regulations and procedures relating to network services;</p>
          <p>2.6.3 The use of a network service system for any unlawful purpose;</p>
          <p>2.6.4 You may not use the TPI Network Services System to conduct any action that may adversely affect the normal operation of the Internet or the mobile network;</p>
          <p>2.6.5 Shall not infringe the patent, copyright, trademark, reputation or any other legitimate rights and interests of TPI and any other third party;</p>
          <p>2.6.6 Do not use the TPI network service system for any adverse TPI behavior;</p>
          <p>2.6.7 If any unauthorized use of user accounts or accounts of security vulnerabilities, should immediately notify the TPI.</p>
          <p>2.8 If the user violates any of the above provisions when using the web service, the TPI or its authorized person has the right to require the user to correct or take all necessary measures (including but not limited to altering or deleting the contents of the user's collection, etc., to suspend or terminate the user's use of the network Service rights) to mitigate the impact of user misconduct.</p>
          <p class="b-c-title">Article 3 User information</p>
          <p>3.1 Users should provide their own integrity to the site registration information, the user agrees that the registration information provided by the user is true, accurate, complete, valid and valid. If the user registration information is subject to change, the registration information should be updated in time. If the registration information provided by the user is not legal, unreal, inaccurate, and exhaustive, the user shall bear the corresponding responsibility and consequence arising from it, and the TPI reserves the right to terminate the service of the TPI.</p>
          <p>3.2 Users will be strictly confidential if they are authorized by the user or have any other information such as the user's real name / name, mailing address, contact telephone number, e-mail and other privacy information when browsing, shopping and other activities. Provides that this site will not disclose user privacy information to the outside world.</p>
          <p>3.3 After the user registration is successful, will generate user name and password and other account information, you can change the password according to the provisions of this site. Users should be careful and reasonable to save, use their user name and password. If you find any illegal use of user accounts or the existence of security vulnerabilities, please immediately notify the site and report to the public security organs.</p>
          <p>3.4 The user shall not lend the account registered in the site to others to use, otherwise the user should bear all the responsibility arising from, and with the actual use of joint and several liability.</p>
          <p class="b-c-title">Article 4 Intellectual Property Rights</p>
          <p>4.1 Any material, images, graphics or materials contained in the network services provided by TPI are protected by copyright, trademark and / or other property ownership laws and shall not be used for any commercial purpose without the consent of the relevant rights holder.</p>
          <p>4.2 TPI is the copyright owner of any software (including but not limited to any images, photographs, text and add-ons contained in the software, accompanying help materials) used to provide network services, Software, the user may not reverse engineer, decompile, or disassemble the software.</p>
          <p class="b-c-title">Article 5 Privacy Protection</p>
          <p>5.1 Protection of user privacy is a basic policy of TPI, TPI guarantees that it is not publicly available or provided to third parties for registration information of individual users and non-public content stored in TPI by users when using network services, except in the following cases:</p>
          <p>5.1.1 Prior authorization of the user;</p>
          <p>5.1.2 According to the relevant laws and regulations;</p>
          <p>5.1.3 In accordance with the requirements of the relevant government authorities;</p>
          <p>5.1.4 In order to safeguard the interests of the public;</p>
          <p>5.1.5 To safeguard the legitimate rights and interests of TPI.</p>
          <p>5.2 Without prejudice to individual user privacy data, TPI has the right to analyze the entire user database and commercial use of the user database.</p>
          <p class="b-c-title">Article 6 distribution</p>
          <p>6.1 The seller will send the goods (goods) to your designated shipping address. All the shipping times listed on this site will be the reference time. The reference time is calculated according to the inventory status, normal processing and delivery Time, delivery location based on the estimated.</p>
          <p>6.2 Due to the following circumstances caused by delay or can not be ordered delivery, etc., the seller does not bear the responsibility for delayed delivery:</p>
          <p>（1）The information provided by the user is wrong, the address is not detailed and other reasons;</p>
          <p>（2）No one sign after delivery of the goods, resulting in delivery or delay delivery;</p>
          <p>（3）Situation change factor;</p>
          <p>（4）Caused by force majeure, such as: natural disasters, traffic martial law, sudden war</p>
          <p class="b-c-title">Article 7 Disclaimer</p>
          <p>7.1 TPI does not guarantee that the network service will be able to meet the requirements of users, nor does it guarantee that network services will not be interrupted, and the timeliness, security and accuracy of network services will not be guaranteed.</p>
          <p>7.2 TPI does not guarantee the accuracy and completeness of the external links provided for the convenience of the user, and the TPI shall not be liable for any content on any web pages that are not specifically controlled by the TPI.</p>
          <p>7.3 TPI shall not be liable for any loss resulting from an Internet network failure, computer malfunction or virus, information corruption or loss, computer system problems, or any other force majeure, but will endeavor to reduce the consequent loss and impact to the user.</p>
          <p class="b-c-title">Article 8 Legal and Dispute Resolution</p>
          <p>This Agreement shall be governed by the laws of the People's Republic of China.</p>
          <p class="b-c-title">Article 9 other</p>
          <p>9.1 TPI respects the legitimate rights of users and consumers, this agreement and the various types of rules, statements and other content posted on this website, are for better and more convenient services for users and consumers. This site welcomes users and the community to make comments and suggestions, TPI will humbly accept and timely modification of this agreement and the various rules on this site.</p>
          <p>9.2 The contents of this agreement in bold, bold, underlined, italic, etc. significantly marked the terms, please focus on reading.</p>
          <p>9.3 You click on the agreement below; agree and continue; the button is deemed to be fully accepted by this agreement and you must confirm that you have known and fully understood the entire contents of this Agreement before clicking.</p>
        </div>

        <div class="box-content" v-if="$i18n.locale == 'th'">
          <p class="b-c-title">ข้อตกลงในการให้บริการผู้ใช้ TPI</p>
          <p>โปรดอ่านและทำความเข้าใจ 《ข้อตกลงในการให้บริการผู้ใช้ 》 (ซึ่งต่อไปนี้จะเรียกว่า "ข้อตกลง") สิทธิและข้อ จำกัด ทั้งหมดที่ระบุไว้ในข้อนี้ เว้นแต่คุณยอมรับเงื่อนไข《ข้อตกลง》 มิฉะนั่นคุณจะไม่มีสิทธิ์ลงทะเบียน เข้าสู่ระบบหรือใช้บริการที่เกี่ยวข้องกับสัญญานี้ พอคุณลงทะเบียน และเข้าสู่ระบบ หรือใช้งานหรือวิธีการใดๆก็ตามที่เกี่ยวข้องในข้อตกลงนี้ จะถือว่าคุณยอมรับข้อตกลงนี้แล้ว ก็แสดงว่าคุณยอมรับเงื่อนไขข้อตกลงนี้ หากคุณไม่ยอมรับเงื่อนไขตามข้อตกลงนี้ โปรดอย่าลงทะเบียน เข้าสู่ระบบหรือใช้งานบริการที่เกี่ยวข้องกับสัญญานี้ สัญญานี้เป้นข้อตกลงทางกฎหมายระหว่างผู้ใช้กับบริษัท TPI market place (ต่อไปนี้จะเรียกว่า "ทีพีไอ")
          </p>
          <p class="b-c-title">เงื่อนไขที่ 1 เนื้อหาการบริการ </p>
          <p>
            <b>1.1คุณไม่จำเป็นต้องมีบัญชีผู้ใช้เพื่อดูเข้าชมเว็บไซต์นี้.</b>แต่ฟังก์ชันการใช้ปละการบริการเว็บไซต์คุณต้องทำการลงทะเบียนบัญชีกับTPI และให้ข้อมูลส่วนบุคคลที่เกี่ยวข้องในหน้าลงทะเบียน คุณสามารถยกเลิกการใช้งานบัญชีของคุณได้ทุกเมื่อ เว็บไซต์นี้จะเก็บรักษาหรือยกเลิกบัญชีของคุณตามข้อกำหนดของข้อตกลงนี้ ข้อมูลที่ลงทะเบียนของผู้ใช้ต้องเป็นข้อมูลจริง รับผิดชอบอย่างเต็มที่ ผู้ใช้จะต้องไม่หลอกว่าเป็นคนอื่น ไม่สามารถใช้ชื่อของบุคคลอื่นเผยแพ่รข้อมูลใดๆ อย่าใช้บัญชีที่ลงทะเบียนโดยเจตนาเพื่อให้เกิดความผิดพลาดอื่นๆ มิฉะนั้นเรามีสิทธิที่จะหยุดให้บริการได้ทันที คุณต้องรับผิดทางกฎหมายทั้งหมดที่เกิดขึ้น พฤติกรรมที่คุณใช้งานเว็บไซต์นี้ต้องเป็นไปตามกฎหมาย คุณต้องรับผิดชอบต่อการดำเนินการทั้งหมดภายใต้บัญชีของคุณ รวมทั้งเนื้อหาใด ๆ ที่คุณเผยแพร่และผลที่เกิดขึ้นจากข้อมูลนั้น เนื้อหานั้นผู้ใช้ต้องเป็นผู้ตัดสินด้วยตัวเอง และรับความเสี่ยงทั้งหมดที่เกิดขึ้นจากการใช้เนื้อหา รวมทั้งความเสี่ยงที่เกิดจากความถูกต้องของเนื้อหา ความครบถ้วนหรือการพึ่งพาการปฏิบัติ บริษัท ทีพีไอไม่อาจรับผิดชอบต่อความสูญเสียหรือความเสียหายที่เกิดจากการปฏิบัติของผู้ใช้ คุณต้องเก็บข้อมูลการเข้าสู่ระบบเป็นความลับ ไม่นำไปให้ผู้อื่นใช้งานและรับผิดชอบต่อการกระทำทั้งหมดของบัญชีของคุณ หากคุณต้องอยู่ในลักษณะที่อาจละเมิดกฎหมาย ไม่รับอนุญาตให้ใช้งานหรือสงสัยว่าจะใช้พฤติกรรมโดยไม่ได้รับอนุญาตเป็นครั้งแรกในการแจ้งเว็บไซต์ เว็บไซต์นี้ไม่รับผิดชอบต่อความสูญเสียที่เกิดจากการไม่ปฏิบัติตามข้อกำหนดข้างต้น
          </p>
          <p>
            <b>1.2คุณต้องทราบและยืนยันว่า เนื่องจากเราต้องการพัฒนาธุรกิจ：</b>เปลี่ยนบางส่วนหรือการบริการทั้งหมดหรือแยกเนื้อหาบริการได้ทุกเมื่อโดยไม่ต้องแจ้งให้ทราบล่วงหน้า ระงับ จำกัด ยุติหรือยกเลิกบริการของเรา ผู้ใช้บริการต้องรับผิดชอบต่อความเสี่ยงนี้ บริการของเราอาจรวมถึงการโฆษณาและกิจกรรมอื่น ๆ ผู้ใช้ยินยอมที่จะใช้โฆษณาและกิจกรรมอื่น ๆ ของเราที่เกี่ยวข้องและคู่ค้าบุคคลที่สาม เป็นพันธมิตรในการโฆษณาและกิจกรรมอื่นๆ เราขอสงวนสิทธิ์ในการใช้ดุลพินิจ แต่เพียงผู้เดียวไม่ว่าจะด้วยเหตุผลอันใดอันเนื่องมาจากการฝ่าฝืนกฎหมายและข้อบังคับที่เกี่ยวข้องหรือข้อตกลงนี้ หรือการละเมิด ทำให้เสื่อมเสีย คุกคามสิทธิของบุคคลใด ๆ หรือเนื้อหาด้านความปลอดภัยหรือหรือเลียนแบบพฤติกรรมของผู้อื่น สิทธิในการยุติการส่งเนื้อหาที่เกี่ยวข้อง และจะมีสิทธิตามที่เห็นสมควร แต่เพียงผู้เดียวในการดำเนินการทางกฎหมายกับบุคคลใดก็ตามที่ฝ่าฝืนข้อตกลงนี้ รวมทั้งจากการลบการบริการที่ผิดกฎหาย ละเมิด เนื้อหาที่ไม่เหมาะสมและอื่นๆ ยุติการเป็นสมาชิกของผู้ฝ่าฝืน ป้องกันไม่ให้ใช้บริการทั้งหมดหรือบางส่วน เพื่อรักษาข้อมูลที่เกี่ยวข้องและรายงานไปยังหน่วยงานที่เกี่ยวข้อง
          </p>
          <p class="b-c-title">เงื่อนไขที่ 2 กฎการใช้งานของผู้ใช้</p>
          <p>2.1 เมื่อสมัครใช้บริการ Web TPI ผู้ใช้ต้องให้ข้อมูลส่วนบุคคลที่ถูกต้องแก่ TPI หากข้อมูลส่วนบุคคลมีการเปลี่ยนแปลงต้องได้รับการอัพเดตทันที เนื่องจากผู้ใช้ให้ข้อมูลส่วนบุคคลไม่ถูกต้อง เป็นเท็จและผลที่เกิดขึ้นทั้งหมดจากผู้ใช้</p>
          <p>2.2 ผู้ใช้ไม่ควรส่งเลขที่บัญชี โอนรหัสผ่าน ให้ยืม จำหน่ายหรือรูปแบบใดๆให้ผู้อื่นใช้งาน หากผู้ใช้พบว่ามีการใช้บัญชีของตนอย่างผิดกฎหมาpควรแจ้งให้TPIทันที หากงจากพฤติกรรมของแฮ็กเกอร์ หรือความประมาทของผู้ใช้ที่นำไปสู่บัญชีที่ถูกใช้อย่างผิดกฎหมายโดยผู้อื่น TPI จะไม่รับผิดชอบใดๆ</p>
          <p>2.3 สิทธิทั้งหมดของบัญชีTPIจะกลับคืนสู่TPI หลังจากที่ผู้ใช้ดำเนินการขั้นตอนการลงทะเบียนเรียบร้อยแล้ว จะได้รับสิทธิ์ในการใช้บัญชี TPI</p>
          <p>2.4 ผู้ใช้จะต้องรับผิดชอบต่อการกระทำทั้งหมดภายใต้บัญชีของตนเอง TPI จะไม่รับผิดชอบต่อความสูญเสียหรือความเสียหายต่อผู้ใช้หรือบุคคลที่สามอื่นใดอันเป็นผลมาจากการดำเนินการของผู้ใช้</p>
          <p>2.5 ผู้ใช้เข้าใจและยอมรับบริการต่างๆของ TPI อาจรวมถึงการโฆษณา ยินยอมใช้บริการดำเนินการของTPIและคู่ค้าบุคคลที่สาม เป็นพันธมิตรการทำโฆษณา</p>
          <p>
            <b>2.6 ผู้ใช้ในการใช้บริการออนไลน์ของ TPI ต้องปฏิบัติตามหลักการดังต่อไปนี้:</b>
          </p>
          <p>2.6.1 ปฏิบัติตามกฎหมายและข้อบังคับที่เกี่ยวข้องกับประเทศจีนและประเทศไทย；</p>
          <p>2.6.2 ปฏิบัติตามข้อตกลงออนไลน์ที่เกี่ยวข้องทั้งหมด</p>
          <p>2.6.3 ไม่สามารถใช้ระบบบริการเครือข่ายเพื่อวัตถุประสงค์ที่ผิดกฎหมาย；</p>
          <p>2.6.4 ไม่ใช้ระบบบริการเครือข่าย TPI เพื่อให้เกิดผลกระทบต่อการทำงานปกติของอินเทอร์เน็ตหรือเครือข่ายโทรศัพท์มือถือ；</p>
          <p>2.6.5 จะไม่ละเมิดสิทธิ์ในสิทธิบัตรของ TPI และบุคคลที่สามอื่นใด ลิขสิทธิ์ สิทธิในเครื่องหมายการค้า ชื่อเสียง หรือผลประโยชน์ทางกฎหมายอื่นๆ；</p>
          <p>2.6.6 ไม่ใช้ระบบบริการเครือข่าย TPI ดำเนินการใด ๆที่มีพฤติกรรมไม่เอื้อต่อ TPI；</p>
          <p>2.6.7 หากมีการใช้บัญชีผู้ใช้หรือบัญชีความเสี่ยงด้านความปลอดภัยโดยไม่ได้รับอนุญาตควรแจ้ง TPI ทันที</p>
          <p>2.8 如用户在使用网络服务时违反任何上述规定，TPI或其授权的人有权要求用户改正或直接采取一切必要的措施（包括但不限于更改或删除用户收藏的内容等、暂停或终止用户使用网络服务的权利）以减轻用户不当行为造成的影响。</p>
          <p class="b-c-title">เงื่อนไขที่3 ข้อมูลผู้ใช้</p>
          <p>3.1ผู้ใช้ควรมีความซื่อสัตย์ในให้ข้อมูลการลงทะเบียน ผู้ใช้ยินยอมว่าข้อมูลการลงทะเบียนที่ได้รับจากผู้ใช้เป็นข้อมูลที่ถูกต้อง แม่นยำ สมบูรณ์ ถูกต้องตามกฎหมาย หากข้อมูลการลงทะเบียนผู้ใช้มีการเปลี่ยนแปลง ควรอัพเดตข้อมูลการลงทะเบียนทันที หากขัอมูลลงทะเบียนที่ผู้ใช้ให้ไม่ถูกต้อง ไม่ครบถ้วน ผู้ใช้ต้องรับผิดชอบและผลที่ตามมา และ TPI ขอสงวนสิทธิ์ในการยกเลิกการใช้บริการ</p>
          <p>3.2เมื่อผู้ใช้เข้าชมเว็บไซต์นี้ สั่งซื้อสินค้าหรือกิจกรรมอื่นๆ เกี่ยวกับชื่อ / ชื่อจริงของผู้ใช้ ที่อยู่ติดต่อ เบอร์ติดต่อ E-mailและข้อมูลความเป็นส่วนตัวอื่นๆ เว็บไซต์จะเก็บเป็นความลับ เว้นแต่จะได้รับอนุญาตจากผู้ใช้หรือข้อกำหนดกฎหมายอื่น ๆ เว็บไซต์นี้จะไม่เปิดเผยข้อมูลส่วนบุคคลของผู้ใช้ต่อโลกภายนอก
          </p>
          <p>3.3หลังจากผู้ใช้ลงทะเบียนสำเร็จ จะสร้างชื่อผู้ใช้และรหัสผ่านและข้อมูลบัญชีอื่น ๆ คุณสามารถเปลี่ยนรหัสผ่านของคุณได้ตามข้อกำหนดของเว็บไซต์นี้ ผู้ใช้ควรบันทึกชื่อผู้ใช้และรหัสผ่านด้วยความระมัดระวัง หากผู้ใช้พบการใช้บัญชีผู้ใช้ที่ผิดกฎหมายหรือการมีช่องโหว่ด้านความปลอดภัย โปรดแจ้งเว็บไซต์นี้ทันทีเพื่อจะได้รายงานไปยังองค์การความมั่นคงสาธารณะ</p>
          <p>3.4ผู้ใช้ไม่สามารถนำบัญชีที่ได้ลงทะเบียนกับเว็บไซต์นี้ไปให้ผู้อื่นใช้ มิฉะนั้นผู้ใช้ควรรับภาระหน้าที่ทั้งหมดที่เกิดขึ้นจากการใช้ความรับผิดร่วมและความรับผิดหลายประการ</p>
          <p class="b-c-title">เงื่อนไขที่ 4 สิทธิในทรัพย์สินทางปัญญา</p>
          <p>4.1 ข้อความ รูปภาพ กราฟิกต่างๆและข้อมูลที่มีอยู่ในบริการเครือข่ายที่ได้รับจาก TPI ได้รับการคุ้มครองตามกฎหมายลิขสิทธิ์เครื่องหมายการค้า /หรือกฎหมายเกี่ยวกับทรัพย์สินอื่น ๆ ห้ามใช้ข้อมูลข้างต้นเพื่อจุดประสงค์ทางการค้าโดยไม่ได้รับความยินยอมจากเจ้าของที่เกี่ยวข้อง
          </p>
          <p>4.2 สิทธิ์ในซอฟต์แวร์ใด ๆ ที่ใช้ในการให้บริการของTPI (รวมทั้งรูปภาพ ภาพถ่าย ตัวอักษรและซอฟต์แวร์ประกอบ เอกสารประกอบความช่วยเหลือ) สิทธิ์ทั้งหมดเป็นของเจ้าของลิขสิทธิ์ซอฟต์แวร์ ผู้ที่ไม่ได้รับอนุญาตจากเจ้าของลิขสิทธิ์ซอฟต์แวร์ ผู้ใช้ไม่ได้รับอนุญาตให้ใช้ซอฟต์แวร์ （reverse engineer） หรือ decompile หรือ disassemble。</p>
          <p class="b-c-title">เงื่อนไขที่ 5 การป้องกันข้อมูลส่วนบุคคล</p>
          <p>5.1 การปกป้องความเป็นส่วนตัวของผู้ใช้เป็นนโยบายพื้นฐานของ TPI เรารับประกันว่าจะไม่เปิดเผยหรือให้ข้อมูลบุคคลที่สามแก่บุคคลที่สามเกี่ยวกับข้อมูลการลงทะเบียนและเนื้อหาของผู้ใช้แต่ละราย ยกเว้นในกรณีต่อไปนี้：
          </p>
          <p>5.1.1 ก่อนการเข้าถึงการให้สิทธิ์ที่ชัดเจนของผู้ใช้</p>
          <p>5.1.2 ตามกฎหมายและข้อบังคับที่เกี่ยวข้อง</p>
          <p>5.1.3 ตามเงื่อนไขของหน่วยงานราชการที่เกี่ยวข้อง</p>
          <p>5.1.4 เพื่อปกป้องผลประโยชน์ของประชาชน</p>
          <p>5.1.5 เพื่อปกป้องสิทธิและผลประโยชน์ที่ถูกต้องตามกฎหมายของทีพีไอ</p>
          <p>5.2 โดยไม่เปิดเผยข้อมูลส่วนตัวของผู้ใช้แต่ละราย TPIมีสิทธิ์ในการวิเคราะห์ฐานข้อมูลผู้ใช้ทั้งหมดและฐานข้อมูลผู้ใช้สำหรับการใช้งานเชิงพาณิชย์</p>
          <p class="b-c-title">เงื่อนไขที่ 6 การจัดส่ง</p>
          <p>6.1 ผู้ขายจะส่งสินค้าไปยังที่อยู่ที่กำหนดไว้ เวลาจัดส่งทั้งหมดที่ระบุในเว็บไซต์นี้เป็นเวลาอ้างอิง เวลาอ้างอิงจะคำนวณตามสถานะคงคลัง ขั้นตอนประมวลและส่งสินค้าตามปกติ สถานที่ส่งสินค้าคาดที่คาดการไว้
          </p>
          <p>6.2เนื่องจากเหตุการณ์ต่อไปนี้เกิดจากการสั่งซื้อล่าช้าหรือไม่สามารถจัดส่งได้ เป็นต้น ผู้ขายไม่รับผิดชอบต่อการจัดส่งล่าช้า：</p>
          <p>（1）สาเหตุจากข้อมูลผู้ใช้ผิดพลาด หรือที่อยู่ไม่รายละเอียดหรืออื่นๆ เป็นต้น；</p>
          <p>（2）หลังจากส่งสินค้าไม่มีผู้เซ็นต์รับของ ทำให้เกิดการส่งที่ช้าหรือไม่อาจส่งสินค้าได้；</p>
          <p>（3）ปัจจัยที่เกิดจากการเปลี่ยนแปลงของสถานการณ์；</p>
          <p>（4）สาเหตุจากเหตุสุดวิสัย เช่น ภัยพิบัติทางธรรมชาติ ปัญหาการจราจร สงครามที่เกิดฉับพลัน เป็นต้น</p>
          <p class="b-c-title">เงื่อนไขที่ 7 คำชี้แจงการปฎิเสธ</p>
          <p>7.1 TPI ไม่รับประกันว่าบริการเครือข่ายจะสามารถตอบสนองความต้องการของผู้ใช้ และไม่รับประกันว่าบริการเครือข่ายจะไม่หยุดชะงัก ความตรงต่อเวลา ความปลอดภัย ความแม่นยำ ก็ไม่อาจรับประกันได้</p>
          <p>7.2 TPI ไม่รับประกันความถูกต้องและความครบถ้วนของลิ๊งค์ภายนอกที่ทำมาเพื่อความสะดวกของผู้ใช้และ TPI จะไม่รับผิดชอบต่อเนื้อหาใด ๆ บนหน้าเว็บไซต์ ที่ไม่ได้มีการควบคุมเฉพาะโดยลิ๊งค์ภายนอกดังกล่าว</p>
          <p>7.3 TPI จะไม่รับผิดชอบต่อความสูญเสียใด ๆ ที่เกิดจากความล้มเหลวของเครือข่ายอินเทอร์เน็ต ความล้มเหลวของคอมพิวเตอร์หรือไวรัส ความเสียหายหรือสูญหายของข้อมูล ปัญหาระบบคอมพิวเตอร์หรือเหตุสุดวิสัยอื่นๆ แต่จะพยายามลดผลขาดทุนและผลกระทบที่เกิดขึ้นกับผู้ใช้
          </p>
          <p class="b-c-title">เงื่อนไขที่ 8 การแก้ปัญหาทางกฎหมายและข้อพิพาท</p>
          <p>ข้อตกลงนี้จะอยู่ภายใต้กฎหมายของสาธารณรัฐประชาชนจีน。</p>
          <p class="b-c-title">เงื่อนไขที่ 9 อื่นๆ</p>
          <p>9.1 TPI ให้ความสำคัญกับสิทธิอันชอบธรรมของผู้ใช้และผู้บริโภค ข้อตกลงนี้และกฎระเบียบต่างๆแถลงการณ์และเนื้อหาอื่น ๆ ที่ประกาศในเว็บไซต์นี้ เพื่อความสะดวกและรวดเร็วยิ่งขึ้นสำหรับผู้ใช้และผู้บริโภคในการให้บริการ เว็บไซต์นี้ยินดีต้อนรับผู้ใช้และสังคมทั่วโลกมาแสดงความคิดเห็นและข้อเสนอแนะTPI จะยอมรับและแก้ไขข้อตกลงนี้และกฎต่างๆในเว็บไซต์นี้</p>
          <p>9.2ข้อกำหนดของข้อตกลงนี้มีการระบุไว้เป็นตัวสีดำ ตัวหนา ขีดเส้นใต้ ตัวเอียง เป็นต้น ผู้ใช้โปรดอ่านให้ละเอียด</p>
          <p>9.3คุณคลิกที่ข้อตกลงด้านล่าง กดปุ่ม ยอมรับและดำเนินการต่อ ก็จะถือว่าคุณยอมรับข้อตกลงนี้อย่างสมบูรณ์ ก่อนคลิกโปรดทำความเข้าใจเนื้อหาทั้งหมดของข้อตกลงนี้ให้ดี</p>
        </div>

        <div class="box-content" v-if="$i18n.locale == 'lo'">
          <p class="b-c-title">ສັນຍາກ່ຽວກັບບໍລິການຜູ້ໃຊ້ TPI</p>
          <p>ກະລຸນາອ່ານແລະເຂົ້າໃຈ."ສັນຍາບໍລິການຜູ້ໃຊ້"(ຕໍ່ໄປນີ້ເອີ້ນວ່າ"ສັນຍາ")ທັງ
ຫມົດກຳມະສິດແລະຂໍ້ຈໍາກັດສິດທີ່ກໍານົດໄວ້ໃນຂໍ້ນີ້.ເວັ້ນເສຍແຕ່ວ່າທ່ານຕົກລົງ
ກັບເງື່ອນໄຂ"ຂໍ້ຕົກລົງ"ທ່ານບໍ່ມີສິດລົງທະບຽນ.ເຂົ້າສູ່ລະບົບຫລືໃຊ້ບໍລິການທີ່
ກ່ຽວຂ້ອງກັບສັນຍານີ້.ພຽງພໍທ່ານລົງທະບຽນແລະເຂົ້າສູ່ລະບົບຫຼືການນໍາໃຊ້ຫຼືວິທີການອື່ນໆທີ່ກ່ຽວຂ້ອງກັບສັນຍານີ້.ຄວາມສະແດງທ່ານຕົກລົງເຫັນດີກັບຂໍ້ຕົກລົງນີ້.ມັນຍັງຊີ້ໃຫ້ເຫັນວ່າທ່ານຕົກລົງເຫັນດີກັບເງື່ອນໄຂຂອງສັນຍານີ້.ຖ້າທ່ານບໍ່ຍອມຮັບຂອງສັນຍານີ້.ກະລຸນາຢ່າລົງທະບຽນ.ເຂົ້າສູ່ລະບົບຫລືໃຊ້ບໍລິການທີ່ກ່ຽວຂ້ອງກັບສັນຍານີ້.ສັນຍານີ້ແມ່ນຂໍ້ຕົກລົງທາງກົດຫມາຍລະຫວ່າງຜູ້ໃຊ້ແລະບໍລິສັດTPI marker place(ຕໍ່ໄປນີ້ເອີ້ນວ່າ "TPI").</p>
          <p class="b-c-title">ເງຶ່ອນໄຂ ທີ່ 1 ເນື້ອໃນບໍລິການ </p>
          <p>
            <b>1.1ທ່ານບໍ່ຈໍາເປັນຕ້ອງມີບັນຊີເພື່ອເບິ່ງເວັບໄຊທ໌ນີ້,</b>ແຕ່ຫນ້າທີ່ຂອງການໃຊ້ບໍລິການເວັບໄຊທ໌ຕ້ອງການລົງທະບຽນບັນຊີຂອງທ່ານກັບTPI.ແລະໃຫ້ຂໍ້ມູນສ່ວນຕົວທີ່ກ່ຽວຂ້ອງໃນຫນ້າລົງທະບຽນ.ທ່ານສາມາດຍົກເລີກບັນຊີຂອງທ່ານໄດ້ທຸກເວລາ.ເວັບໄຊທ໌ນີ້ຈະຮັກສາຫຼືຍົກເລີກບັນຊີຂອງທ່ານຕາມ
ເງື່ອນໄຂຂອງສັນຍານີ້.ຂໍ້ມູນການລົງທະບຽນຜູ້ໃຊ້ຕ້ອງເປັນຄວາມຈິງແລ່ະຄວາມສົມເຫດສົມຜົນ.ເຕັມທີ່ຮັບຜິດຊອບທັງຫມົດ.ບໍໄດ້ໃສ່ຊື່ຜູ້ໃຊ້ອື່ນ.ບໍ່ສາມາດໃຊ້ຊື່
ຂອງຄົນອື່ນເພື່ອເປີດເຜີຍຂໍ້ມູນໃດໆ.ຢ່າໃຊ້ບັນຊີທີ່ໄດ້ລົງທະບຽນໂດຍເຈດຕະນາເພື່ອເຮັດໃຫ້ຄວາມຜິດພາດອື່ນໆ.ຖ້າບໍ່ດັ່ງນັ້ນ,ພວກເຮົາມີສິດທີ່ຈະຢຸດທັນທີ.ທ່ານມີຄວາມຮັບຜິດຊອບຕໍ່ຜົນສະທ້ອນດ້ານກົດຫມາຍທັງຫມົດ.ພຶດຕິກໍາທີ່ທ່ານນໍາໃຊ້ໃນເວັບໄຊທ໌ນີ້ແມ່ນຖືກປົກຄອງໂດຍກົດຫມາຍ.ທ່ານມີຄວາມຮັບຜິດຊອບຕໍ່ການກະທໍາທັງຫມົດພາຍໃຕ້ບັນຊີຂອງທ່ານ. ລວມເນື້ອໃນທີ່ທ່ານເຜີຍແຜ່ແລະຜົນສະທ້ອນຂອງຂໍ້ມູນນັ້ນ.ເນື້ອໃນແມ່ນການຕັດສິນຂອງຕົວເອງໂດຍຜູ້ໃຊ້.ແລະເອົາຄວາມສ່ຽງທັງຫມົດທີ່ເກີດຂຶ້ນຈາກການໃຊ້
ເນື້ອຫາ.ລວມທັງຄວາມສ່ຽງທີ່ເກີດຈາກຄວາມຖືກຕ້ອງຂອງເນື້ອຫາ.ການຄົບຖ້ວນສົມບູນຫຼືຄວາມຂັດແຍ້ງກ່ຽວກັບການປະຕິບັດTPI.ບໍ່ຮັບຜິດຊອບຕໍ່ການສູນເສຍຫຼືຄວາມເສຍຫາຍໃດໆທີ່ເກີດຂື້ນຈາກການກະທໍາຂອງຜູ້ໃຊ້.ທ່ານຕ້ອງຮັກສາຂໍ້ມູນ
ເຂົ້າສູ່ລະບົບຂອງທ່ານເປັນຄວາມລັບ.ຢ່າໃຊ້ມັນສໍາລັບການນໍາໃຊ້ແລະການຮັບ
ຜິດຊອບອື່ນສໍາລັບການກະທໍາຂອງບັນຊີຂອງທ່ານ.ຖ້າທ່ານຕ້ອງການໃນທາງ
ທີ່ອາດຈະລະເມີດກົດຫມາຍ.ການນໍາໃຊ້ທີ່ບໍ່ໄດ້ຮັບອະນຸຍາດຫຼືສົງໃສວ່າການນໍາ
ໃຊ້ທີ່ບໍ່ໄດ້ຮັບອະນຸຍາດເປັນຄັ້ງທໍາອິດໃນການແຈ້ງເຕືອນຂອງເວັບໄຊທ໌. ເວັບໄຊທ໌ນີ້ບໍ່ມີຄວາມຮັບຜິດຊອບຕໍ່ການສູນເສຍໃດໆທີ່ເກີດຂື້ນຈາກການບໍ່ປະຕິບັດຕາມຂໍ້ຂ້າງຕົ້ນ.

          </p>
          <p>
            <b>1.2ທ່ານຕ້ອງຮູ້ແລະຢືນຢັນວ່າ：</b>ເນື່ອງຈາກວ່າພວກເຮົາຕ້ອງການທີ່ຈະຂະຫຍາຍທຸລະກິດຂອງພວກເຮົາ: ປ່ຽນບາງສ່ວນຫຼືທັງຫມົດຂອງການບໍລິການຂອງພວກເຮົາຫຼືສະກັດເນື້ອຫາຂອງພວກເຮົາອອກຈາກທີ່ໃຊ້ເວລາໂດຍບໍ່ຕ້ອງແຈ້ງການລ່ວງຫນ້າ,ພວກເຮົາມີສິດການປ່ຽນແປງການຢຸດເຊົາການຈຳກັດການສິ້ນສຸດ,ຫຼືການຍົກເລີກການບໍລິການຂອງ
ພວກເຮົາ.ຜູ້ໃຊ້ມີຄວາມຮັບຜິດຊອບຕໍ່ຄວາມສ່ຽງນີ້.ບໍລິການຂອງພວກເຮົາອາດປະກອບມີການໂຄສະນາແລະກິດຈະກໍາອື່ນໆ,ຜູ້ໃຊ້ເຫັນດີນໍາໃຊ້ການໂຄສະນາແລະກິດຈະກໍາທີ່ກ່ຽວຂ້ອງອື່ນໆ,ແລະຄູ່ຮ່ວມງານຂອງພາກສ່ວນທີສາມ.ຄູ່ຮ່ວມງານໃນການໂຄສະນາແລະກິດຈະກໍາອື່ນໆ.ພວກເຮົາສະຫງວນສິດທີ່ຈະໃຊ້ຄວາມລະ
ມັດລະວັງ.ພຽງແຕ່ສໍາລັບເຫດຜົນໃດກໍ່ຕາມທີ່ເປັນຜົນມາຈາກການລະເມີດກົດຫມາຍແລະລະບຽບການທີ່ກ່ຽວຂ້ອງຫຼືຂໍ້ຕົກລົງນີ້.ຫຼືການລ່ວງລະເມີດການຂັດຂວາງຂົ່ມຂູ່ຕໍ່ສິດທິຂອງບຸກຄົນໃດໆຫຼືເນື້ອຫາຄວາມປອດໄພໃດໆຫຼືປຽບທຽບພຶດຕິກໍາຂອງຄົນອື່ນ.ສິດທີ່ຈະຢຸດການສົ່ງຂໍ້ມູນທີ່ກ່ຽວຂ້ອງ.ແລະຈະມີສິດທີ່ຖືວ່າເຫມາະສົມ ການປະຕິບັດຕາມກົດຫມາຍຕໍ່ກັບຜູ້ໃດທີ່ລະເມີດຂໍ້ຕົກລົງນີ້. ລວມທັງການຖອນບໍລິການ, ການທຳລາຍ ກົດລະບຽບ, ເນື້ອຫາທີ່ຂາດຫາຍ, ເນື້ອຫາທີ່ຂົ່ມເຫັງແລະອື່ນໆ.ຢຸດການເປັນສະມາຊິກຂອງຜູ້ກະທໍາຜິດ. ຫ້າມທັງຫມົດຫຼືສ່ວນຫນຶ່ງຂອງການບໍລິການ. ເພື່ອຮັກສາຂໍ້ມູນທີ່ກ່ຽວຂ້ອງແລະລາຍງານກັບເຈົ້າຫນ້າທີ່ທີ່ກ່ຽວຂ້ອງ.

          </p>
          <p class="b-c-title">ເງື່ອນໄຂ ທີ່ 2 ເງື່ອນໄຂການນໍາໃຊ້ຂອງຜູ້ໃຊ້</p>
          <p>2.1 ເມື່ອສະມາຊິກຂໍການບໍລິການເວັບໄຊທ໌TPI,ຜູ້ໃຊ້ຕ້ອງໃຫ້TPIມີຂໍ້ມູນສ່ວນບຸກຄົນທີ່ຖືກຕ້ອງ.ຖ້າຂໍ້ມູນສ່ວນບຸກຄົນຖືກປ່ຽນແປງ,ການປັບປຸງຕ້ອງຖືກຕ້ອງທັນທີ. ເນື່ອງຈາກຜູ້ໃຊ້ສະຫນອງຂໍ້ມູນສ່ວນຕົວທີ່ບໍ່ຖືກຕ້ອງ. ມັນແມ່ນຄວາມຜິດພາດແລະຜົນໄດ້ຮັບທັງຫມົດແມ່ນມາຈາກຜູ້ໃຊ້.</p>
          <p>2.2 ຜູ້ໃຊ້ບໍ່ຄວນສົ່ງເລກບັນຊີ,ໂອນລະຫັດຜ່ານ,ໃຫ້ກູ້ຢືມ,ຂາຍຫຼືເຮັດວຽກອື່ນໆ. ຖ້າຜູ້ໃຊ້ພົບວ່າບັນຊີຂອງພວກເຂົາຖືກໃຊ້ຜິດ,ຄວນແຈ້ງໃຫ້TPIທັນທີ. ຖ້າຫາກວ່າພຶດຕິກໍາຂອງແຮກເກີໄດ້.TPIຈະບໍ່ຮັບຜິດຊອບກ່ຽວກັບການໃຊ້ຜິດຫຼືການປະຕິເສດໂດຍຜູ້ໃຊ້ຂອງບັນຊີໃດໆທີ່ຖືກນໍາໃຊ້ຢ່າງຜິດກົດຫມາຍ.</p>
          <p>2.3 ທັງຫມົດກຳມະສິດຂອງບັນຊີTPIເປັນຂອງTPI ຫຼັງຈາກທີ່ຜູ້ໃຊ້ສໍາເລັດຂະບວນການລົງທະບຽນ. ຈະມີສິດທີ່ຈະໃຊ້ບັນຊີ TPI.</p>
          <p>2.4 ຜູ້ໃຊ້ມີຄວາມຮັບຜິດຊອບຕໍ່ການກະທໍາທັງຫມົດພາຍໃຕ້ບັນຊີຂອງຕົນເອງ. TPIຈະບໍ່ຮັບຜິດຊອບຕໍ່ການສູນເສຍຫຼືຄວາມເສຍຫາຍຕໍ່ຜູ້ໃຊ້ຫຼືບຸກຄົນທີສາມ
ອື່ນໆທີ່ເປັນຜົນມາຈາກການກະທໍາຂອງຜູ້ໃຊ້.
</p>
          <p>2.5 ຜູ້ໃຊ້ທີ່ເຂົ້າໃຈແລະຍອມຮັບການບໍລິການຕ່າງໆຂອງTPIອາດມີການໂຄສະນາ ອະນຸຍາດໃຫ້ນໍາໃຊ້ການບໍລິການຂອງ TPI ແລະຄູ່ຮ່ວມງານພາກສ່ວນທີສາມ. ກາຍເປັນຄູ່ຄ້າໂຄສະນາ.</p>
          <p>
            <b>2.6 ຜູ້ໃຊ້ຂອງTPI ຂໍການບໍລິການ ເວັບໄຊທ໌ຕ້ອງປະຕິບັດຕາມຫຼັກການດັ່ງຕໍ່ໄປນີ້:</b>
          </p>
          <p>2.6.1 ປະຕິບັດຕາມກົດຫມາຍແລະລະບຽບການທີ່ກ່ຽວຂ້ອງກັບຈີນແລະລາວ;</p>
          <p>2.6.2 ປະຕິບັດຕາມຂໍ້ຕົກລົງອອນໄລນ໌ທີ່ກ່ຽວຂ້ອງທັງຫມົດ.</p>
          <p>2.6.3 ບໍ່ສາມາດໃຊ້ບໍລິການເຄືອຂ່າຍໄດ້ສໍາລັບຈຸດປະສົງທີ່ຜິດກົດຫມາຍ;</p>
          <p>2.6.4 ບໍ່ໄດ້ໃຊ້ບໍລິການເຄືອຂ່າຍTPIເພື່ອສົ່ງຜົນກະທົບຕໍ່ການດໍາເນີນງານຕາມປົກກະຕິຂອງອິນເຕີເນັດຫຼືເຄືອຂ່າຍມືຖື;</p>
          <p>2.6.5 ຈະບໍ່ລະເມີດສິດທິບັດສິດທິຂອງ TPI ແລະບຸກຄົນທີສາມອື່ນໃດ, ລິຂະສິດ, ສິດທິຂອງເຄື່ອງຫມາຍການຄ້າ, ຊື່ສຽງຫຼືຜົນປະໂຫຍດທາງກົດຫມາຍອື່ນໆ;</p>
          <p>2.6.6 ຢ່າໃຊ້ລະບົບບໍລິການເຄືອຂ່າຍTPIເພື່ອປະຕິບັດການປະພຶດທີ່ບໍ່ແມ່ນປະ
ໂຫຍດຕໍ່ TPI;
</p>
          <p>2.6.7 ຖ້າບັນຊີຜູ້ໃຊ້ທີ່ບໍ່ໄດ້ຮັບອະນຸຍາດຫຼືບັນຊີຄວາມປອດໄພຖືກນໍາໃຊ້,ໃຫ້ແຈ້ງທັນທີວ່າ TPI.</p>
          <p>2.8 ເມຶ່ອສະມາຊິກຂໍການບໍລິການເວັບໄຊທ໌ຖ້າລະເມີດຂໍ້ກຳນົດດັ່ງກ່າວ.TPIຫລືຜູ້ກຳນົດສິດມີສິດໃຫ້ຜູ້ໃຊ້ແກ້ໄຂຫລືໃຊ້ມາດຕະການຕ່າງໆເຮັດໃຫ້ຫລຸດຜ່ອນຜົນສະທ້ອນຂອງ
ຜູ້ກະທຳຜິດ(ກວມແຕ່ບໍ່ກຳຈັດໃນການປ່ຽນແປງຫລືການລືບທີ່ເນື້ອໃນຂອງສະມາຊິກເກັບກຳໄວ້ແລະອຶ່ນໆ. ຢຸດເຊົາ ຫລື ໝົດສິດທີ່ສະມາຊິກໃຊ້ບໍລິການເວັບໄຊທ໌)
</p>
          <p class="b-c-title">ເງື່ອນໄຂ ທີ່ 3 ຂໍ້ມູນຜູ້ໃຊ້</p>
          <p>3.1 ຜູ້ໃຊ້ຄວນມີຄວາມຊື່ສັດໃນການໃຫ້ຂໍ້ມູນການຈົດທະບຽນ.ຜູ້ໃຊ້ເຂົ້າໃຈວ່າຂໍ້ມູນການຈົດທະບຽນທີ່ໄດ້ມາຈາກຜູ້ໃຊ້ແມ່ນຖືກຕ້ອງ,ຄົບຖ້ວນ, ຖືກຕ້ອງຕາມກົດຫມາຍ.ຖ້າຂໍ້ມູນການຈົດທະບຽນຜູ້ໃຊ້ມີການປ່ຽນແປງ.ຂໍ້ມູນການຈົດທະບຽນຄວນໄດ້ຮັບການປັບປຸງທັນທີ.ຖ້າຂໍ້ມູນການຈົດທະບຽນຜູ້ໃຊ້ບໍ່ຖືກຕ້ອງ, ຜູ້ໃຊ້ຈະຮັບຜິດຊອບແລະດັ່ງນັ້ນTPIຂໍສະຫງວນສິດໃນການຍົກເລີກການບໍລິການ.</p>
          <p>3.2 ໃນເວລາທີ່ຜູ້ໃຊ້ຢ້ຽມຢາມເວັບໄຊທ໌ນີ້ ຄໍາສັ່ງຫຼືກິດຈະກໍາອື່ນໆ. ກ່ຽວກັບຊື່ / ຊື່ຈິງຂອງຜູ້ໃຊ້.ທີ່ຢູ່ຕິດຕໍ່,ອີເມວຕິດຕໍ່,ແລະຂໍ້ມູນສ່ວນບຸກຄົນອື່ນໆ. ເວັບໄຊທ໌ຖືກເກັບຮັກສາເປັນຄວາມລັບ.</p>
          <p>3.3 ຫຼັງຈາກຜູ້ໃຊ້ໄດ້ລົງທະບຽນແລ້ວ ມັນຈະສ້າງຊື່ຜູ້ໃຊ້ແລະລະຫັດຜ່ານແລະຂໍ້ມູນບັນຊີອື່ນໆ. ທ່ານສາມາດປ່ຽນລະຫັດຜ່ານຕາມຄວາມຕ້ອງການຂອງເວັບໄຊທ໌ນີ້. ຜູ້ໃຊ້ຄວນປະຢັດຊື່ຜູ້ໃຊ້ແລະລະຫັດຜ່ານດ້ວຍການດູແລ. ຖ້າຜູ້ໃຊ້ພົບບັນຫາຜູ້ໃຊ້ທີ່ຜິດກົດຫມາຍຫຼືຄວາມສ່ຽງດ້ານຄວາມປອດໄພ ກະລຸນາລາຍງານສະຖານທີ່ນີ້ທັນທີເພື່ອລາຍງານຕໍ່ອົງການຄວາມປອດໄພສາທາລະນະ.</p>
          <p>3.4 ຜູ້ໃຊ້ບໍ່ສາມາດເອົາບັນຊີທີ່ລົງທະບຽນກັບເວັບໄຊທ໌ນີ້ກັບຄົນອື່ນໄດ້.
ຖ້າບໍ່ດັ່ງນັ້ນ, ຜູ້ໃຊ້ຄວນຖືສົມບັດທັງຫມົດທີ່ເກີດຂຶ້ນຈາກການນໍາໃຊ້ຄວາມຮັບຜິດຊອບຮ່ວມກັນແລະຄວາມຮັບຜິດຊອບຫຼາຍ.
</p>
          <p class="b-c-title">ເງື່ອນໄຂ ທີ່ 4: ສິດທິດ້ານຊັບສິນທາງປັນຍາ</p>
          <p>4.1 ຂໍ້ຄວາມ, ຮູບພາບ, ຮູບລ່ຽມແລະຂໍ້ມູນທີ່ມີຢູ່ໃນບໍລິການເຄືອຂ່າຍຂອງ TPI ຖືກປົກປ້ອງໂດຍລິຂະສິດ.ຫຼືກົດຫມາຍຊັບສິນອື່ນໆ,ບໍ່ໃຊ້ຂໍ້ມູນຂ້າງເທິງເພື່ອຈຸດປະສົງທາງການຄ້າໂດຍບໍ່ມີການຍິນຍອມຂອງເຈົ້າຂອງ.</p>
          <p>4.2 ອະນຸຍາດສໍາລັບຊອບແວທີ່ໃຊ້ໃນການໃຫ້ບໍລິການ TPI. (ລວມເອົາຮູບພາບ, ຮູບລ່ຽມ,ຂໍ້ຄວາມແລະຊອບແວທີ່ມາພ້ອມກັນ.ເອກະສານຊ່ວຍເຫຼືອ)ສິດທັງຫມົດ
ຂອງເຈົ້າຂອງລິຂະສິດຂອງຊອບແວ. ຜູ້ທີ່ບໍ່ໄດ້ຮັບອະນຸຍາດຈາກເຈົ້າຂອງລິຂະສິດຂອງຊອບແວ.ຜູ້ໃຊ້ບໍ່ໄດ້ຮັບອະນຸ
ຍາດໃຫ້ນໍາໃຊ້ວິສະວະກໍາຍ້ອນກັບຫຼືສັງລວມທາງກົງກັນຂ້າມຫຼືການລວບລວມ
ທາງກົງກັນຂ້າມ
</p>
          <p class="b-c-title">ເງື່ອນໄຂ ທີ່ 5: ການປົກປ້ອງຂໍ້ມູນສ່ວນບຸກຄົນ</p>
          <p>5.1 ຍົກເວັ້ນໃນກໍລະນີຕໍ່ໄປນີ້:</p>
          <p>5.1.1 ກ່ອນທີ່ຈະເຂົ້າເຖິງສິດອະທິບາຍຢ່າງຊັດເຈນຂອງຜູ້ໃຊ້</p>
          <p>5.1.2 ສອດຄ່ອງກັບລະບຽບກົດຫມາຍທີ່ກ່ຽວຂ້ອງ.</p>
          <p>5.1.3 ອີງຕາມເງື່ອນໄຂຂອງອໍານາດການປົກຄອງທີ່ກ່ຽວຂ້ອງ.</p>
          <p>5.1.4 ເພື່ອປົກປ້ອງຜົນປະໂຫຍດຂອງປະຊາຊົນ.</p>
          <p>5.1.5 ເພື່ອປົກປ້ອງສິດແລະຜົນປະໂຫຍດທີ່ຖືກຕ້ອງຂອງ TPI</p>
          <p>5.2 ໂດຍບໍ່ເປີດເຜີຍຂໍ້ມູນສ່ວນບຸກຄົນຂອງຜູ້ໃຊ້ແຕ່ລະຄົນ.TPI ມີສິດທີ່ຈະວິເຄາະຖານຂໍ້ມູນຜູ້ໃຊ້ແລະຖານຂໍ້ມູນຜູ້ໃຊ້ສໍາລັບການນໍາໃຊ້ທາງດ້ານການຄ້າ.</p>
          <p class="b-c-title">ເງື່ອນໄຂ ທີ່ 6 ຂົນສົ່ງໄປເຮຶອນ</p>
          <p>6.1 ຜູ້ຂາຍຈະສົ່ງສິນຄ້າໄປຫາທີ່ຢູ່ທີ່ກໍານົດໄວ້.ເວລາຂົນສົ່ງທັງຫມົດທີ່ລະບຸໄວ້ໃນ
ເວັບໄຊທ໌ນີ້ຖືກອ້າງອີງ.ເວລາທີ່ອ້າງອີງຖືກຄິດໄລ່ອີງໃສ່ສະຖານະການຄັງສິນຄ້າ.ຂະບວນການ,ຂະບວນການແລະການຂົນສົ່ງຕາມປົກກະຕິ.ສະຖານທີ່ຈັດສົ່ງທີ່
ຄາດຫວັງ
</p>
          <p>6.2 ເນື່ອງຈາກເຫດການດັ່ງຕໍ່ໄປນີ້ແມ່ນເກີດຈາກການຊັກຊ້າຫຼືຄວາມລ່າຊ້າໃນການຈັດສົ່ງ, ຜູ້ຂາຍບໍ່ໄດ້ຮັບຜິດຊອບໃນການສົ່ງທ້າຍປີ້:</p>
          <p>（1）ສາເຫດຂອງຂໍ້ມູນຜູ້ໃຊ້ທີ່ຜິດພາດ. ຫຼືບໍ່ມີລາຍລະອຽດທີ່ຢູ່ຫຼືອື່ນໆ;</p>
          <p>（2）ຫຼັງຈາກການສົ່ງ,ບໍ່ມີໃບຢັ້ງຢືນການຮັບ.ເຮັດໃຫ້ການຈັດສົ່ງຊ້າຫຼືບໍ່ສາມາດສົ່ງອອກ;</p>
          <p>（3）ປັດໄຈທີ່ເກີດຈາກການປ່ຽນແປງສະຖານະການ;</p>
          <p>（4）ເກີດມາຈາກຜົນບັງຄັບໃຊ້ ທີ່ໄພບາງອຶດ ເຊັ່ນ: ໄພພິບັດທາງທໍາມະຊາດ. ບັນຫາການຈະລາຈອນ ສົງຄາມຢ່າງວ່ອງໄວ, ແລະອື່ນໆ.</p>
          <p class="b-c-title">ເງື່ອນໄຂ ທີ່ 7 ຄໍາຖະແຫຼງການຂອງການຈໍາແນກ</p>
          <p>7.1 TPIບໍ່ສາມາດຮັບປະກັນວ່າເຄືອຂ່າຍຈະສາມາດຕອບສະຫນອງຄວາມຕ້ອງ
ການຂອງຜູ້ໃຊ້ໄດ້.ແລະມັນບໍ່ໄດ້ຮັບປະກັນວ່າບໍລິການເຄືອຂ່າຍຈະບໍ່ຂັດຂວາງ. ຄວາມປອດໄພ, ຄວາມຖືກຕ້ອງ, ຄວາມຖືກຕ້ອງບໍ່ສາມາດຮັບປະກັນໄດ້.
ຜູ້ທີ່ບໍ່ໄດ້ຄວບຄຸມໂດຍສະເພາະການເຊື່ອມຕໍ່ພາຍນອກດັ່ງກ່າວ.</p>
          <p>7.2 TPI ບໍ່ໄດ້ຮັບປະກັນຄວາມຖືກຕ້ອງແລະຄົບຖ້ວນຂອງການເຊື່ອມຕໍ່ພາຍນອກທີ່ສະຫນອງໃຫ້ຄວາມສະດວກຂອງຜູ້ໃຊ້ແລະ TPI ຈະບໍ່ຮັບຜິດຊອບຕໍ່ເນື້ອຫາໃດໆໃນຫນ້າເວັບຕ່າງໆທີ່ບໍ່ຖືກຄວບຄຸມໂດຍ TPI ສໍາລັບການເຊື່ອມຕໍ່ພາຍນອກດັ່ງກ່າວ.</p>
          <p>7.3 TPIຈະບໍ່ຮັບຜິດຊອບຕໍ່ການສູນຫາຍທີ່ເກີດຈາກການລົ້ມລະລາຍທາງອິນເຕີ
ເນັດ.ຄອມພິວເຕີລົ້ມເຫລວຫຼືໄວຣັດຄວາມເສຍຫາຍຫຼືການສູນເສຍຂໍ້ມູນ.ບັນຫາ
ຄອມພິວເຕີ້ຫຼືເຫດການບັງຄັບໃຊ້ອື່ນໆແຕ່ຈະພະຍາຍາມຫຼຸດຜ່ອນການສູນເສຍ
ແລະຜົນກະທົບຕໍ່ຜູ້ໃຊ້.
</p>
          <p class="b-c-title">ເງື່ອນໄຂ ທີ່ 8 ການແກ້ໄຂບັນຫາດ້ານກົດຫມາຍແລະຂັດແຍ້ງ</p>
          <p>ສັນຍານີ້ຖືກປົກຄອງໂດຍກົດຫມາຍຂອງສາທາລະນະລັດປະຊາຊົນຈີນ.</p>
          <p class="b-c-title">ເງື່ອນໄຂ ທີ່ 9 ອື່ນໆ</p>
          <p>9.1 TPIກໍານົດສິດທິທີ່ຖືກຕ້ອງຂອງຜູ້ໃຊ້ແລະຜູ້ບໍລິໂພກ.ຂໍ້ຕົກລົງນີ້ແລະລະບຽບ
ການຕ່າງໆ,ຄໍາຖະແຫຼງການແລະເນື້ອຫາອື່ນໆທີ່ຖືກຈັດໃສ່ໃນເວັບໄຊທ໌ນີ້. ສໍາລັບຄວາມສະດວກແລະຄວາມວ່ອງໄວສໍາລັບຜູ້ໃຊ້ແລະຜູ້ບໍລິໂພກທີ່ຈະໃຫ້ບໍລິການ.ເວັບໄຊທ໌ນີ້ຕ້ອນຮັບຜູ້ນໍາໃຊ້ແລະຊຸມຊົນໃນທົ່ວໂລກສໍາລັບຄໍາເຫັນແລະຄໍາແນະນໍາ TPI. ຈະຍອມຮັບແລະແກ້ໄຂຂໍ້ຕົກລົງແລະກົດລະບຽບໃນເວັບໄຊທ໌ນີ້.
</p>
          <p>9.2 ເນື້ອໃນຂອງຂໍ້ຕົກລົງນີ້ມີຄວາມຫນາແຫນ້ນ, ຫນາແຫນ້ນ, ເນັ້ນຫນັກ, ສະກົດ, ອື່ນໆ, ຫມາຍເຖິງຂໍ້ກໍານົດ, ກະລຸນາສຸມໃສ່ການອ່ານ.</p>
          <p>9.3 ທ່ານຄລິກໃສ່ຂໍ້ຕົກລົງຂ້າງລຸ່ມນີ້,ກົດປຸ່ມຍອມຮັບແລະສືບຕໍ່.ມັນຈະຖືວ່າທ່ານຍອມຮັບຂໍ້ຕົກລົງນີ້ຢ່າງສົມບູນ.ກ່ອນທີ່ຈະກົດ,ກະລຸນາເຂົ້າໃຈເນື້ອໃນເຕັມຂອງສັນຍານີ້ດີ.</p>
        </div>

        <div class="box-content" v-if="$i18n.locale == 'my'">
          <p class="b-c-title">TPI  အသံုးျပဳသူ၀န္ေဆာင္မွဳမ်ားသေဘာတူညီခ်က</p>
          <p>အသံုးျပဳသူ၀န္ေဆာင္မွုဆိုင္ရာသေဘာတူညီခ်က္အတြက္သတ္မွတ္ထားေသာအားလံုးေသာအခြင့္အေရးႏွင့္ကန္သတ္ခ်က္ မ်ားကိုနားလည္ေစရန္ဂရုတစိုက္ ဖတ္ရွဴပါ။သင္သည္  ထိုသေဘာတူညီခ်က္ ဧ။္စည္းကမ္းခ်က္မ်ာားကို လက္ခံျခင္း (သို ့မဟုတ္) မွတ္ပံုတင္ရန္ အေကာင့္ရွိ္သည့္အေပၚ Log  (သို ့မဟုတ္) ၀န္ေဆာင္ခ်က္ကို သေဘာတူျပီး အသံုးျပဳပါ။သေဘာတူညီခ်က္ႏွင့္ ပါ၀င္ပါတ္သက္ေသာ ၀န္ေဆာင္မွဳမ်ားဧ။္ သေဘာတူညီခ်က္အား လက္ခံလွ်င္ သင္ဧ။္မွတ္ပံုတင္ ရန္အတြက္ အသင့္ျဖစ္သည္ပါမည္။သင္သည္ ထိုသေဘာတူညီခ်က္မ်ား ႏွင့္ စည္းကမ္းခ်က္မ်ားအား လက္မခံလွ်င္ မွတ္ပဲုတင္ခြင့္မေပးပါ။ အဆိိုပါ သေဘာတူညီခ်က္သည္ ေစ်းကြက္ေနရာအရပ္ရပ္တြင္ အသံုးျပဳသူႏွင့္ companyျကား တရား၀င္ဆက္သြယ္မွဳျဖစ္သည္။</p>
          <p class="b-c-title">အပိုဒ္ ၁ ၀န္ေဆာင္မွဳမ်ား </p>
          <p>
            <b>1.1 သင္သည္ ဒီ Website အား Browser ႏွင့္လည့္လာျကည့္ရွဳရန္</b> သက္သက္အတြက္အေကာင့္မလိုအပ္ပါ။ TPI အေကာင့္ တစ္ခုသည္ မွတ္ပံုတင္ထားေသာစာမ်က္ႏွာေပၚတြင္ပုဂိုလ္ေရးဆိုင္ရာသတင္းအခ်က္လက္မ်ားကိုျဖည့္စြတ္ရန္ လိုအပ္ပါသည္ ။သင္သည္ သင္အသံုျပဳေနေသာ အေကာင့္ကို ရပ္ဆိုင္းခ်င္သည့္အခ်ိန္တြင္ ကြ်ႏ္ုပ္တို ့ဧ။္ညြွန္ျကားခ်က္အတိုင္းလိုက္နာရပါမည္၊ ကြ်ႏ္ုပ္တို ့ မွ သေဘာတူညီခ်က္ကို လက္ခံသင့္မခံသင့္ (သို ့)အေကာင့္အားဆက္လက္ထိန္းသိမ္းရန္ သင့္ မသင့္ အား  ဆံုးျဖတ္ပါမည္။ အသံုးျပဳသူမ်ားသည္ မွတ္ပံုတင္ရာတြင္ စစ္မွန္ေသာ အခ်က္အလက္မ်ားျဖစ္ေျကာင္းအျပည့္အ၀တာ၀န္ယူႏိုင္ရမည္။ တျခားသူနာမည္အား အသံုးမျပဳရ။ အျခားသူမ်ားကိုယ္စား ျဖန္ခ်ီမည့္ သတင္းအခ်က္အလက္ကို အသံုးမျပဳျကရန္  ထိုသို ့အသံုးျပဳျခင္းကို ကြ်ႏ္ုပ္တု ့ဘက္မွေနရ်္ အခ်ိန္မေရြး ရပ္တန္ ့ႏိုင္သည္ ။ဒီဆိုဒ္ကို သင္အသံုးမွဳေျကာင့္ သင့္ဧ။္ ကိုယ္ပိုင္အေကာင့္တြင္ ရွိေသာ လုပ္ရပ္မ်ား အေျကာင္းအရာမ်ား အေပၚတြင္ သင့္တစ္ဦးတည္းတြင္သာ တာ၀န္ရွိသည္ဟုသတ္မွတ္သည္။အသံုးျပဳသူသည္ မိမိကိုယ္ပိုင္ဆံုးျဖတ္ခ်က္ျဖင့္
အသံုးျပဳေျကာင့္ျဖစ္လာေသာ ျပသနာအရပ္ရပ္ကို အသံုးျပဳသူသည္သာ တာ၀န္ယူရမည္။ထိုကဲ့သို ့ ျပသနာမ်ားအား TPI မွတာ၀င္ယူေျဖရွင္းေပးလိမ့္မည္မဟုတ္ပါ။သင္မဟုတ္ေသာအျခားသူသည္ သင္ရဲ့ မွတ္ပံုတင္အခ်က္အလက္မ်ား ကိုအသံုးျပဳျခင္းမ်ားမျဖစ္ေစရန္ တာ၀န္ယူရပါမည္။ သင့္အေနျဖင့္ ခြင့္ျပဳခ်က္မရွိဘဲသံုးစြဲျခင္း (သို ့မဟုတ္)ပထမဆံုးအျကိမ္ website မွ ခြင့္ျပဳခ်က္မရွိဘဲ သံုးစြဲသည္ဟု သံသယ ျဖစ္ရ်္အေျကာင္းျကားစာပို ့ေပးပါမည္ အထက္ပါ အေျကာင္းအရာမ်ားအား သင့္ပ်က္ကြက္မွဳေျကာင့္ ျဖစ္လာေသာ ဆံုးရွံဳးမွဳမ်ားအတြက္တာ၀န္ယူျခင္းျပဳလုပ္လိမ့္မည္ မဟုတ္ပါ။
          </p>
          <p>
            <b>1.2 သင့္သည္ အသိမွတ္ျပဳျခင္း ႏွင့္ အတည္ျပဳေျကာင္းရရွိမည္：</b>ကြႏ္ုပ္တို ့သည္ ထိုစီးပြားေရ လုပ္ငန္းဖြံ ့ျဖိဳးတိုးတက္ရန္ လိုအပ္သည့္အားလံုး (သို ့မဟုတ္) Service ႏွင့္ Contents ဧ။္ အေျကာင္းအရာမ်ားေျပာင္းလဲမွဳမ်ားကို အသိေပးစာမပို ့ပဲ မည္သည့္အခ်ိန္မွ ကန္ ့သတ္ဆိုင္းငံ့ထားမည္မဟုတ္ပါ။ကြ်ႏ္ုပ္ တို ့ဧ။္ ၀န္ေဆာင္မွဳ ႏွင့္ သံုးစြဲသူဧ။္အခြင့္ေရးကို အဆံုးသတ္ျခင္း (သို့မဟုတ္) ရုပ္သိမ္းရန္္ သင္ဧ။္ဘက္မွအေျကာင္းျကားရမည္။ ကြ်ႏ္ုပ္တို ့ဧ။္၀န္ေဆာင္မွဳမ်ားျဖစ္သည့္ ေျကာ္ျငာလုပ္ငန္းမ်ားတြင္ အသံုးျပဳသူဧ။္ ေျကာ္ျငာျခင္းႏွင့္အျခားလွဳပ္ရွားမွဳမ်ား ႏွင့္ Third Party ေရာင္းခ်သူ မ်ားႏွင့္ ပါတ္သတ္သည္မ်ားကိုပူတြဲေဖာ္ျပရန္ ကြ်ႏ္ုပ္တို ့ဧ္။္ဘက္မွ ဆံုျဖတ္ပိုင္ခြင့္မ်ားရွိပါသည္။ ကြ်ႏ္ုပ္ တို ့ႏွင့္သက္ဆိုင္ရာဥပေဒ စည္းကမ္းခ်က္မ်ား (သို ့မဟုတ္) က်ဴးေက်ာ္ျခင္း၊ ထိခိုက္ေစျခင္း၊ မည္သူမဆိုအား လုပ္ပိုင္ခြင့္ ကူညီ ျခင္းသို႔မဟုတ္ လံုၿခံဳေရးအေၾကာင္းရာ၊ သို႔မဟုတ္ တစ္ပါးသူအား အတုျပဳလုပ္သည့္ အျပဳအမူ၊ မည္သည့္ သက္ဆိုင္ရာ အေၾကာင္းအရာမဆို လႊဲေျပာင္းေပးပို႔ျခင္းအား ရပ္စဲပိုင္ခြင့္ရွိသည္။ ၎အျပင္ အျခားေသာ ဤသေဘာတူညီခ်က္၏ မည္သည့္ပုဂိၢဳလ္မဆို သင့္ေတာ္ေသာ တရား ဥပေဒအျပဳအမူအရ ကိုယ္တိုင္ဆံုးျဖတ္ပိုင္ခြင့္ရွိသည္ ဟုပါ၀င္သည္သို႔ေသာ္ မကန္႔သတ္ပါ။ ၀န္ေဆာင္မႈ မွ ဥပေဒ ခ်ိဳးေဖါက္သည့္ သေဘာသဘာ၀ က်ဴးေက်ာ္ပိုင္ခြင့္ အေၾကာင္းရာ စသည္တို႔ျဖစ္သည္။ ေဖါက္ဖ်က္သူ အဖြဲ႕၀င္ အေကာင့္ရပ္စဲျခင္း၊ ကၽြန္ေတာ္တို႔၏ ၀န္ေဆာင္မႈတစ္ခုလံုး သို႔မဟုတ္ တစိတ္တစ္ေဒသ ၀န္ေဆာင္မႈ အဟန္႔အတားျပဳသည္။ ၎အျပင္ ဥပေဒ၊ ဥပေဒစည္းမ်ဥ္းအေျခခံၿပီး သက္ဆိုင္ရာ သတင္းအခ်က္လက္ ထိန္းသိမ္းျခင္းႏွင့္ သက္ဆိုင္ရာ လုပ္ငန္းဌာနသို႔ တင္ျပျခင္းျဖစ္သည္။
          </p>
          <p class="b-c-title">အပိုဒ္ ၂ အသံုးျပဳသူသည္ စည္းမ်ဥ္းမ်ားျဖင့္အသံုးျပဳျခင္း</p>
          <p>2.1 အသံုးျပဳသည္ TPI အင္တာနက္၀န္ေဆာင္မႈ အသံုးျပဳရန္ ေလွ်ာက္ထားသည့္ အခါ TPI သို႔ တိက်သည့္ တစ္ဦးခ်င္းအခ်က္အလက္ ပံ့ပိုးေပးရမည္။ အကယ္၍ တစ္ဦးခ်င္း အခ်က္လက္ မည္သည့္ေျပာင္းလဲမႈမဆိုရွိပါက အခ်ိန္မီ အသစ္ေျပာင္းလဲရမည္။ အသံုးျပဳသူမွ တစ္ဦးခ်င္း အခ်က္လက္ ပံ့ပိုးျခင္းသည္ မတိက်မမွန္ကန္ျခင္းေၾကာင့္ မမွန္မကန္ျဖစ္ကာ ျဖစ္ေပၚလာသည့္ အက်ိဳးဆက္အားလံုးစြာ အသံုးျပဳသူမွ တာ၀န္ယူရမည္။ </p>
          <p>2.2 အသံုးျပဳသူသည္ စာရင္းအမွတ္၊ ကုတ္နံပါတ္က လႊြဲေျပာင္းေပးျခင္း။ ငွါးရမ္းေပးျခင္း၊ ျဖန္႔ျဖဴးေရာင္း ခ်ျခင္း သို႔မဟုတ္ မည္သည့္အျခား အသံုးျပဳသူမဆို စာရင္းနံပါတ္သည္ အျခားသူမ်ား၏ တရားမ၀င္အသံုးျပဳျခင္း ႀကံဳေတြ႕ပါက TPI သို႔ ခ်က္ခ်င္းအေၾကာင္းၾကားရမည္။ ထိုသို ့ေသာေဖါက္သည္၏ အျပဳမူေၾကာင့္ သို႔မဟုတ္ အသံုးျပဳသူ၏ ထိန္းသိမ္းျခင္း နေမာ္နမဲ့ျပဳျခင္းေျကာင့္စာရင္းနံပါတ္ထိျဖစ္ေပၚလာျခင္း ကုတ္နံပါတ္သည္ သူတစ္ပါး၏ တရားမ၀င္ အသံုးျပဳျခင္း ႀကံဳေတြ႕လွ်င္ TPI သည္ မည္သည့္တာ၀န္မွယူမည္မဟုတ္ပါ။</p>
          <p>2.3 TPI စာရင္း အမွတ္အားလံုးလုပ္ပိုင္ခြင့္မွာ TPI ႏွင့္ သက္ဆိုင္သည္။ အသံုးျပဳသူမွ မွတ္ပံုတင္ ေလွ်ာက္ထားျခင္း စည္းမ်ဥ္းစည္းကမ္းခ်က္ ေဆာင္ရြက္ၿပီးေနာက္ TPI ၏ စာရင္းအမွတ္ အသံုးျပဳ ပိုင္ခြင့္ရရွိသည္။ </p>
          <p>2.4 အသံုးျပဳသူသည္ ကိုယ္တိုင္စာရင္း မွတ္ပံုတင္ျခင္း၏ အားလံုးေသာ အျပဳမူ တာ၀န္ယူရမည္။ အသံုးျပဳသူ၏ အျပဳမူေၾကာင့္ အသံုးျပဳသူ ကိုယ္တိုင္ သို႔မဟုတ္ အျခားတတိယဘက္ မည္သည့္ ဆံုး႐ံႈးမႈ သို႔မဟုတ္ ထိခိုက္ပ်က္စီးျခင္း ျဖစ္ေပၚေစျခင္းအား TPI မွ တာ၀န္မယူပါ။ </p>
          <p>2.5 အသံုးျပဳသူနားလည္ျခင္းႏွင့္ TPI ပံ့ပိုးေပးသည့္ ၀န္ေဆာင္မႈတြင္ ေၾကာ္ျငာပါ၀င္ႏိုင္ေျခအား လက္ခံသည္။ အင္တာနက္၀န္ေဆာင္မႈ အသံုးျပဳသည့္ လုပ္ငန္းစဥ္တြင္ TPI ႏွင့္ တတိယဘက္ ေပးသြင္းသူ လုပ္ေဖာ္ကိုင္ဘက္အျဖစ္ ပူးေပါင္းျခင္းႏွင့္ ေၾကာ္ျငာပံ့ပိုးေပးျခင္းအား သေဘာတူညီ သည္။ </p>
          <p>
            <b>2.6 အသံုးျပဳသူသည္ TPI အင္တာနက္ ၀န္ေဆာင္မႈ အသံုးျပဳသည့္ လုပ္ငန္းစဥ္တြင္ ေအာက္စည္းမ်ား အား လိုက္နာရမည္။:</b>
          </p>
          <p>2.6.1 တ႐ုတ္ႏိုင္ငံႏွင့္ ထိုင္းႏိုင္ငံသက္ဆိုင္ရာဥပေဒ၊ ဥပေဒစည္းမ်ဥ္းလုိက္နာရမည္။</p>
          <p>2.6.2 အားလံုးေသာ အင္တာနက္၀န္ေဆာင္မႈႏွင့္ သက္ဆိုင္သည့္ အင္တာနက္ သေဘာတူညီခ်က္ သတ္မွတ္ခ်က္ႏွင့္ လုပ္ငန္းစဥ္ လိုက္နာရမည္။ </p>
          <p>2.6.3 မည္သည့္တရားမ၀င္သည့္ ရည္ရြယ္ခ်က္ျဖင့္ အင္တာနက္၀န္ေဆာင္မႈစနစ္အတြက္ အသံုးမျပဳရ။</p>
          <p>2.6.4 TPI အင္တာနက္ ၀န္ေဆာင္မႈစနစ္ အျခားမည္သည့္ အင္တာနက္ႏွင့္ ပတ္သက္ၿပီး သို႔မဟုတ္ ေရြ႕လ်ားအင္တာနက္ ပံုမွန္လည္ပတ္ျခင္း ျဖစ္ေပၚေစသည့္ အက်ိဳးသက္ေရာက္မႈ မရွိသည့္ အျပဳမူ အသံုးျပဳလုပ္ကိုင္ေဆာင္ရြက္ျခင္း မျပဳလုပ္ရ။</p>
          <p>2.6.5 TPI ႏွင့္ အျခားေသာ မည္သည့္အတိဘက္၏ မူပိုင္ခြင့္၊ ေရးသားပိုင္ခြင့္ ကုန္အမွတ္တံဆိပ္ပိုင္ခြင္၊ ဂုဏ္သတင္းပိုင္ခြင့္ႏွင့္ အျခားေသာမည္သည့္  တရား၀င္သည္ လုပ္ပိုင္ခြင့္ အက်ိဳးကိုမွ က်ဴးေက်ာ္ ျခင္း မျပဳလုပ္ရ။ </p>
          <p>2.6.6 TPI အင္တာနက္ ၀န္ေဆာင္မႈ စနစ္အား အျခားမည္သည့္ TPI ႏွင့္ အက်ိဳးမရွိသည့္ အျပဳအမူ အသံုးျပဳလုပ္ကိုင္ေဆာင္ရြက္ျခင္း၊ မျပလုပ္ရ။ </p>
          <p>2.6.7 အကယ္၍ မည္သည့္တရားမ၀င္သည့္ အသံုးျပဳသူ အသံုးျပဳသည္ စာရင္းသို႔မဟုတ္ စာရင္းတြင္ လံုၿခံဳေရး ယိုေပါက္ေတြ႕ရွိသည့္ အေျခအေနတြင္ TPI သို႔ ခ်က္ခ်င္း အေၾကာင္းၾကားရမည္။ </p>
          <p>2.8 အကယ္၍ အသံုးျပဳသူသည္ အင္တာနက္၀န္ေဆာင္မႈ အသံုးျပဳသည့္အခါ အထက္တြင္ ေဖၚျပ သည့္ မည္သည့္သတ္မွတ္ခ်က္မဆို ေဖါက္ဖ်က္ပါက TPI သို႔မဟုတ္ လုပ္ပိုင္ခြင့္အပ္ႏွင္းျခင္းခံရ သူတြင္ အသံုးျပဳသူအား အမွန္ျပင္ဆင္ျခင္း သို႔မဟုတ္  တိုက္႐ိုက္လို္အပ္သည့္ အတိုင္းတာမ်ား ရယူထားရမည္။ (သို႔ေသာ္ေျပာင္းလဲျခင္း သို႔မဟုတ္ ပယ္ဖ်က္အသံုးျပဳသူ သိမ္းဆည္း ထားသည့္ အေၾကာင္းအရာစသည္၊ ယာယီရပ္ဆိုင္းျခင္း၊ သို႔မဟုတ္ အသံုးျပဳသူ အသံုးျပဳသည့္ အင္တာနက္၀န္ေဆာင္မႈ လုပ္ပို္င္ခြင့္ မကန္႔သတ္ပါ) အသံုးျပဳသူမ်ား မသမာေသာ အျပဳမူျဖင့္ ထိခိုက္ျခင္းျဖစ္ေပၚေစျခင္းအား ေလ်ာ့နည္းေပါ့ပါးေစသည္။</p>
          <p class="b-c-title">ပုဒ္မ-(၃)- အသံုးျပဳသူ သတင္းအခ်က္လက</p>
          <p>3.1 အသံုးျပဳသူသည္ ကိုယ္တိုင္႐ိုးသားစြာျဖင့္ ဤအင္တာနက္သို႔ မွတ္ပံုတင္အခ်က္လက္ ပံ့ပိုးေပးၿပီး အျခားေသာ ပံ့ပိုးေပးသည့္ မွတ္ပံုတင္ အခ်က္လက္ တိက်မွန္ကန္ျခင္း၊ ၿပီးျပည့္စံုျခင္း၊ တရား၀င္ အက်ိဳးသက္ေရာက္မႈျခင္းအား အသံုးျပဳသူမွ သေဘာတူသည္။ မရွင္းလင္းသည္မ်ား ဤသို႔ျဖစ္ေပၚေစသည့္ လိုက္ေလ်ာညီေထြရွိသည့္ တာ၀န္ႏွင့္ အက်ိဳးဆက္အသံုးျပဳသူမွ တာ၀န္ယူ ရန္ လိုအပ္သည္။ ၎အျပင္ TPI သည္ အသံုးျပဳသူမ်ား အသံုးျပဳသည့္ TPI အစီအစဥ္အသီးသီး ၀န္ေဆာင္မႈ လုပ္ပိုင္ခြင့္အား အဆံုးသတ္ျခင္း ထိန္းသိမ္းသည္။</p>
          <p>3.2 အသံုးျပဳသူသည္ ဤအင္တာနက္တြင္ အၾကမ္းဖ်င္းၾကည့္ျခင္း လုပ္ကိုင္ေဆာင္ရြက္ၿပီး ပစၥည္း ၀ယ္ယူေရး အမွာစာရင္း ခ်မွတ္သည့္အခါ အသံုးျပဳသူ၏ အမည္မွန္/ အေခၚေ၀ၚဆက္သြယ္ရန္ လိပ္စာ၊ ဆက္သြယ္သည့္ဖုန္း၊ အီးေမးစသည့္ ပုဂၢိဳလ္ သတင္းအခ်က္လက္ ပတ္သက္လာသည္။ ဤအင္တာနက္သည္ တင္းက်ပ္စြာ  လွ်ိဳ႕၀ွက္ထိန္းသိမ္းထားသည္။ အသံုးျပဳသူ၏ လုပ္ပိုင္ခြင့္ လႊြဲေျပာင္းေပးျခင္း ရရွိခဲ့ေသာ္ သို႔မဟုတ္ ဥပေဒအရ အျခားသတ္မွတ္ခ်က္ရွိလွ်င္ ဤအင္တာနက္သည္  အသံုးျပဳသအတြက္ ဖံုးကြယ္ထားသည္။ သတင္းအခ်က္အလက္ ျပင္ပသို႔ ေပါက္ၾကားမည္မဟုတ္ပါ။ </p>
          <p>3.3 အသံုးျပဳသူ မွတ္ပံုတင္ေအာင္ျမင္ၿပီးေနာက္ ျဖစ္ေပၚလာသည့္ အသံုးျပဳသူအမည္ႏွင့္ ကုတ္နံပါတ္ စသည့္ စာရင္းသတင္းအခ်က္လက္သည္ သင္သည္ အသံုးျပဳသူသည္ ဂ႐ုတစိုက္တရားနည္းလမ္းက်က် ထိန္းသိ္မ္းထားရမည္။ ဤအင္တာနက္မွ သတ္မွတ္ခ်က္အတိုင္း သင္၏ကုတ္နံပါတ္ကို ေျပာင္းလဲႏိုင္သည္။ အျခားေသာ အသံုးျပဳသူ အမည္ႏွင့္ ကုတ္နံပါတ္ထိန္းသိမ္းရမည္။ အကယ္၍ အသံုးျပဳသူသည္ မည္သည့္တရားမ၀င္သည့္ အသံုးျပဳထားသည့္ အသံုးျပဳသူစာရင္း အမွတ္ သို႔မဟုတ္ လံုၿခံဳေရး ယိုေပါက္တြင္ ရွိေနသည့္ အေျခအေနအား ခ်က္ခ်င္း ဤအင္တာနက္ သို႔ အေၾကာင္းၾကားၿပီး လံုၿခံဳေရးယႏၱရားသို႔ အေျကာင္းၾကားရမည္။ </p>
          <p>3.4 အသံုးျပဳသူသည္ ဤအင္တာနက္တြင္ မွတ္ပံုတင္ထားျခင္းရရွိၿပီး ရရွိသည့္ စာရင္းအား အျခား သူတို႔ အသံုးမျပဳေစရပါ။ ထိုသို႔မဟုတ္ပါက အသံုးျပဳသူသည္ ဤမွျဖစ္ေပၚလာသည့္ တာ၀န္ အားလံုး တာ၀န္ယူရမည္။ အမွန္တကယ္ အသံုးျပဳသူႏွင့္ အက်ိဳးဆက္တာ၀န္ယူရမည္။ </p>
          <p class="b-c-title">ပုဒ္မ (၄)- ဥစၥာပစၥည္း ပိုင္ဆုိင္ခြင ့္</p>
          <p>4.1 TPI ပံ့ပိုးေပးသည့္ အင္တာနက္ ၀န္ေဆာင္မႈတြင္ ထုတ္ေ၀ျခင္းခံရသည့္ မည္သည့္စာအုပ္၊ ႐ုပ္ပံုအခ်က္လက္ အားလံုးမွာ ပါ၀င္သည္။ ကုန္အမွတ္တံဆိပ္ႏွင့္/ သို႔မဟုတ္ အျခားေသာ ဥစၥာပစၥည္း တရားဥပေဒ အကာကြယ္၏ အားလံုးေသာ သက္ဆိုင္ရာ လုပ္ပိုင္ခြင့္ရွိသူ၏ သေဘာ တူညီခ်က္မရ သည့္ အခ်က္လက္အားလံုးအား မည္သည့္ ကူးသန္းေရာင္း၀ယ္ေရး ရည္မွန္းခ်က္တြင္ အသံုးမျပဳရပါ။ </p>
          <p>4.2 TPI သည္ အင္တာနက္၀န္ေဆာင္မႈ ပံ့ပိုးေပးရန္အတြက္ အသံုးျပဳသည့္ မည္သည့္ေဆာ့၀ဲလ္မဆို ပါ၀င္သည္။ သို႔ေသာ္ ေဆာ့၀ဲလ္တြင္ ပါ၀င္သည့္ မည္သည့္႐ုပ္ပံု၊ ဓါတ္ပံု၊ စာႏွင့္ေနာက္ဆက္တြဲ လုပ္ငန္းစဥ္၊ လိုက္ေလ်ာညီေထြ ေနာက္ဆက္တြဲအကူညီေပးပစၥည္း၊ (မကန္႔သတ္သည့္ လုပ္ပိုင္ခြင့္ အားလံုးမွာ ေဆာ့၀ဲလ္ႏွင့္ အက်ံဳး၀င္သည့္ ေရးသားခြင့္ရွိသူသည္ ဤေဆာ့၀ဲလ္၏ ေရးသားပိုင္ခြင့္ ျပဳခ်က္မရဘဲ အသံုးျပဳသူသည္ ေဆာ့၀ဲလ္ႏွင့္ ပတ္သက္ၿပီး ဆန္႔က်င္ဘက္ဦးတည္သည့္ အင္ဂ်င္ နီယာ (REVERE ENGINEER) ဆန္႔က်င္ဘက္ ဦးတည္သည့္ (DECOMPILE) တည္းျဖတ္ျခင္း သို႔မဟုတ္ ဆန္႔က်င္ဘက္စုစည္းတည္းျဖတ္ျခင္း (DISSEMBLE) အား လုပ္ကိုင္ေဆာင္ရြက္ျခင္း မျပဳလုပ္ရ။</p>
          <p class="b-c-title">ပုဒ္မ-(၅)- ကိုယ္ေရးကိုယ္တာမထုတ္ေဖၚလိုသည့္ ကိစၥအကာအကြယ္ေပးျခင္း။</p>
          <p>5.1 အသံုးျပဳသူ၏ ကိုယ္ေရးကိုယ္တာမဟုတ္ ေဖၚလိုသည့္ ကိစၥရပ္အား အကာအကြယ္ေပးျခင္း၏ မူ၀ါဒ တစ္ရပ္ျဖစ္သည္။ TPI သည္ ျပင္ပသို႔ ဖြင့္ေပးျခင္းမျပဳလုပ္ရန္ အာမခံၿပီး တတိယဘက္သို႔ တစ္ဦးခ်င္းအသံုးျပဳသူ၏ မွတ္ပံုတင္အခ်က္လက္ႏွင့္  အသံုးျပဳသူ အင္တာနက္ ၀န္ေဆာင္မႈ အသံုး ျပဳသည့္အခါ စုေဆာင္းထားသည့္ TPI ၏ တရားမ၀င္အေၾကာင္းရာမ်ားမွာ ေအာက္ပါအေျခေနမွ အပ ျဖစ္သည္။ </p>
          <p>        5.1.1 ေရွ႕ဦးစြာ အသံုးျပဳသူ၏ တိက်ရွင္းလင္းသည့္ လုပ္ပိုင္ခြင့္ေပးအပ္ျခင္း ရရွိျခင္း။</p>
          <p>5.1.2 သက္ဆိုင္ရာ ဥပေဒ၊ ဥပေဒစည္းမ်ဥ္းလိုအပ္ခ်က္အရ။</p>
          <p>5.1.3 သက္ဆိုင္ရာ အစိုးရ တာ၀န္ခံဌာန၏ လိုအပ္ခ်က္အတိုင္း။</p>
          <p>5.1.4 လူမႈအမ်ားအက်ိဳး၏ အက်ိဳအား ထိန္းသိမ္းကာကြယ္ရန္အတြက္။</p>
          <p>5.1.5 TPI ၏ တရား၀င္ လုပ္ပိုင္ခြင့္ အက်ိဳးထိန္းသိမ္းကာကြယ္ရန္အတြက္</p>
          <p>5.2 တစ္ဦးခ်င္း၏ ကိုယ္ေရးကိုယ္တာ မထုတ္ေဖၚလိုသည့္ ႀကိဳတင္စဥ္းစားရမည့္အခ်က္တြင္ TPI သည္ အသံုးျပဳသူ အခ်က္လက္ တစ္ခုလံုးအား ခြဲျခမ္းစိတ္ျဖာလုပ္ကိုင္ေဆာင္ရြက္ျခင္းႏွင့္ အသံုးျပဳ သူ အခ်က္လက္အား စီးပြားေရးလုပ္ငန္းေပၚ အသံုးျပဳျခင္းအား လုပ္ကိုင္ေဆာင္ရြက္သည္။ </p>
          <p class="b-c-title">ပုဒ္မ(၆)-  ျဖန္႔ေ၀ေပးျခင္း။</p>
          <p> 6.1  ျဖန္႔ျဖဴးေရးဘက္သည္ ထုတ္လုပ္ကုန္ပစၥည္း အမွတ္တံဆိပ္ (ကုန္ပစၥည္း)အား သင္သတ္မွတ္ထား သည့္ ကုန္ပစၥည္းလက္ခံသည့္ေနရာသို႔ အားလံုးေသာ ဤအင္တာနက္တြင္ စာရင္းသြင္းထားသည့္ ကုန္ပစၥည္း ပို႔ခ်ိန္မွာ ကိုးကားသည့္ အခ်ိန္ျဖစ္ပါသည္။ ကိုးကားသည့္ အခ်ိန္တြက္ခ်က္မႈမွာ သိုေလွာင္႐ံုပစၥည္း လက္က်န္အေျခအေနအရျဖစ္သည္။ ပုံမွန္ေဆာင္ရြက္ျခင္း လုပ္ငန္းစဥ္ႏွင့္ ကုန္ပစၥည္းေပးပို႔သည့္ အခ်ိန္၊ ကုန္ပစၥည္းေပးပို႔သည့္ေနရာ အေျခခံခန္႔မွန္း တြက္ခ်က္၍ရသည္။</p>
          <p> 6.2  ေအာက္ပါအေျခအေနမ်ားေၾကာင့္ ကုန္ပစၥည္းအမွာလႊာ ေနာက္က်ျခင္း သို႔မဟုတ္ ျဖန္႔ေ၀ေပးျခင္း ငွါ စသည့္ မတတ္ႏိုင္ပါ။ ျဖန္႔ျဖဴးေရာင္းခ်သူဘက္မွ ကုန္ပစၥည္းျပန္႔ေစသည္။ တာ၀န္ေႏွာင့္ေႏွးျခင္း အား တာ၀န္မယူပါ။：</p>
          <p>（1）အသံုုးျပဳသူ ပံ့ပိုးေပးသည့္ သတင္းအခ်က္လက္မွားယြင္းျခင္း၊ လိပ္စာအေသးစိပ္မက်သည့္ အေၾကာင္းရင္းေၾကာင့္ ျဖစ္ေပၚေစျခင္း။</p>
          <p>（2）ကုန္ပစၥည္းအေရာက္ပို႔ၿပီးေနာက္ လက္မွတ္ငထိုးလက္ခံသူမရွိ၊ ျဖန္႔ေ၀ျခင္းငွါ မတတ္ႏိုင္သည္အထိ ျဖစ္ေပၚေစျခင္း သို႔မဟုတ္ ေႏွာင့္ေႏွးၾကန္႔ၾကာျဖန္႔ေ၀ေပးျခင္း။</p>
          <p>（3）အေျခအေနေျပာင္းလဲသည့္ အေၾကာင္းရင္းေၾကာင့္ ျဖစ္ေပၚေစသည္။ </p>
          <p>（4）မလြန္ဆန္သည့္ အေၾကာင္းရင္းေၾကာင့္ ျဖစ္ေပၚေစသည့္ ဥပမာ- သဘာ၀ေဘးအႏၱရာယ္၊ လမ္းပန္းဆက္သြယ္ေရး တင္းက်ပ္စြာ တားျမစ္ျခင္း ႐ုတ္တရက္စစ္မက္ျဖစ္ပြားျခင္း စသည္တို႔ျဖစ္ သည္။ </p>
          <p class="b-c-title">ပုဒ္မ(၇) - မသက္ဆိုင္ေၾကာင္း ရွင္းလင္းခ်က္။</p>
          <p>7.1 TPI သည္ အင္တာနက္၀န္ေဆာင္မႈသည္ အသံုးျပဳသူ တစ္စံုတစ္ခုေသာ လိုအပ္ခ်က္တာ၀န္ မယူပါ။   အင္တာနာနက္၀န္ေဆာင္မႈၾကား မျပတ္ေတာက္ေၾကာင္း တာ၀န္မယူပါ။ အင္တာနက္ အသံုးျပဳျခင္း ၏ အခ်ိန္မီသေဘာသဘာ၀ လံုၿခံဳမႈ သေဘာသဘာ၀ တိက်မွန္ကန္သည့္ သေဘာ သဘာ၀အားလံုးမွာလည္း အာမမခံပါ။</p>
          <p>7.2 TPI အသံုးျပဳသူ ေဖါက္သည္မ်ားအတြက္ အဆင္ေျပစြာ ပံ့ပိုးေပးကာကြယ္တပ္ဆင္ ခ်မွတ္သည့္ ျပင္ပအခ်ိန္ဆက္ တိက်မွန္ကန္ျခင္း သေဘာသဘာ၀ တစ္ခ်ိန္တည္းတြင္ ဤအဆင့္ျပင္ပ အခ်ိတ္ အဆက္ ညႊန္ျပသည့္မွာ TPI အမွန္တကယ္ ထိန္းခ်ဳပ္ထားသည္ မည္သည့္အင္တာနက္စာရြက္ ေပၚရွိ အေၾကာင္းရာအား TPI မွ မည္သည့္တာ၀န္ကိုမွ တာ၀န္ယူမည္မဟုတ္ အသံုးျပဳသူအတြက္ လည္း TPIမွ အာမ မခံပါ။</p>
          <p>7.3 အင္တာနက္ကြန္ယက္ အဟန္႔အတားျဖစ္ျခင္းႏွင့္ ပတ္သက္ၿပီး ကြန္ပ်ဴတာ၏ အဟန္႔အတား သို႔မဟုတ္ ဗိုင္းရပ္စ္) ဗိုင္းရစ္ ၊ သတင္းအခ်က္လက္ပ်က္စီးျခင္း သို႔မဟုတ္ ေပ်ာက္ပ်က္သြားျခင္း ကြန္ပ်ဴတာစနစ္ ျပႆနာသို႔မဟုတ္ အျခားမည္သည့္ မလြန္ဆန္ႏိုင္သည့္ အေၾကာင္းရင္းေၾကာင့္ ျဖစ္ေပၚေစသည့္ ဆံုး႐ံႈးမႈ၊ TPI သည္ မည္သည့္တာ၀န္ကိုမွ တာ၀န္မယူပါ။ သို႔ေသာ္ အတတ္ ႏိုင္ဆံုး ဤသို႔ျဖင့္ အသံုးျပဳသူမ်ားအား ျဖစ္ေပၚေစသည့္ ဆံုး႐ံႈးမႈႏွင့္ထိခိုက္ျခင္းအား ေလ်ာ့နည္း ေစသည္။</p>
          <p class="b-c-title">ပုဒ္မ(8) - ဥေပေဒႏွင့္ အျငင္းပြားျခင္းေျဖရွင္းျခင္း။</p>
          <p>ဤသေဘာတူညီခ်က္သည္ တ႐ုတ္ျပည္သူ႔သမၼတႏိုင္ငံဥပေဒအား အသံုးျပဳမည္။ </p>
          <p class="b-c-title">ပုဒ္မ(၉)–အျခား</p>
          <p>9.1 TPI သည္ အသံုးျပဳသူ သံုးစြဲသူ၏ တရား၀င္လုပ္ပိုင္ခြင့္အား အေလးထားသည္။ ဤသေဘာတူညီ ခ်က္ႏွင့္ ဤအင္တာနက္ ထုတ္ျပန္သည့္ အမ်ိဳးမ်ိဳးေသာ စည္းမ်ဥ္းမ်ား၊ ထုတ္ေဖၚေျပာၾကားျခင္း စသည့္ အျခားေသာ အေၾကာင္းအရာအားလံုးမွာ ပို၍ ေကာင္းမြန္သည့္ ပို၍အဆင္ေျပေစၿပီး အသံုး ျပဳသူႏွင့္ သံုးစြဲသူတို႔အား ၀န္ေဆာင္မႈ ပံ့ပိုးေပးသည္။ ဤအင္တာနက္သည္ အသံုးျပဳသူႏွင့္ လူ႔ေဘာင္အလႊာအသီးသီးအား သေဘာထားအျမင္ တင္ျပျခင္းႏွင့္ အႀကံျပဳသည္။ TPI သည္ စိတ္ရွည္လက္ရွည္ လက္ခံျခင္းႏွင့္ အခ်ိန္ခါႏွင့္ လိုက္ေလ်ာညီေထြ ဤသေဘာတူညီခ်က္ႏွင့္ ဤအင္တာနက္ေပၚရွိ အမ်ိဳးမ်ိဳးေသာ စည္းမ်ဥ္းမ်ားအား ျပင္ဆင္ေျပာင္းလဲသည္။</p>
          <p>9.2 ဤသေဘာတူညီခ်က္ အေၾကာင္းရာတြင္ အနက္ေရာင္စားလံုးတိုး၍ ျပသျခင္း၊ ေအာက္တြင္ လိုင္းဆြဲျခင္း ေစာင္းသည္စာလံုးပံုစံ  စသည့္ နည္းလမ္းထင္ရွားသည့္ အမွတ္အသား အခ်က္လက္ ျဖင့္ အသံုးျပဳသူအား အေလးထားေဖာ္ျပေပးပါသည္။</p>
          <p>9.3 သေဘာတူညီခ်က္၏ ေအာက္ပါအခ်က္မ်ားျဖင့္ ေစ်းကြက္ ဖြင့္လာျခင္း။ သေဘာတူသည္ ဆက္လက္ ေဆာင္ရြက္သည္။ ခလုတ္အား သင္၏ လံုး၀ ဤသေဘာတူညီခ်က္အား လက္ခံသည္ ဟူ၍ ႐ႈျမင္ သည္။ ခ်က္ခ်င္းမေဆာင္ရြက္မိပါက သင့္အား တစ္ႀကိမ္ထပ္မ၍ သိႏွင့္ ၿပီးသည္တို႔အား အတည္ျပဳ ရန္ႏွင့္ ဤသေဘာတူညီခ်က္တစ္ခုလံုး၏ အေၾကာင္းရာအားလံုး လံုး၀နားလည္ၿပီးျဖစ္သည္ အထိေဆာင္ရြက္ေပးသည္။</p>
        </div>
        <div class="agreed bc-do-btn" @click="rulesView= false">{{$t('login.agreeAndContinue')}}</div>
      </div>
    </div>
    <div class="foot ub ub-ae ub-pc">
      TPI.IMPORT-EXPORT & SHIPPING CO., LTD. © 2017. Privacy Policy
    </div>
    <!--<footer-b></footer-b>-->
  </div>
</template>
<script>
import { register, getCode, login } from '@/service/main/login'
var clear;
export default {
  data() {
    return {
      //登录注册视图
      loginView: true,
      rulesView: false,
      //错误提示
      errTip: '',
      //用户协议
      affirm: true,
      loginData: {
        email: '',
        pwd: ''
      },
      registerData: {
        username: '',
        email: '',
        code: '',
        pwd: ''
      },
      VerificationState: {
        username: 0,
        email: 0,
        code: 0,
        pwd: 0
      },
      codeS: '',
      codeText: 'login.getVerificationVode',
      readonly: false,
      loginBut: 'login.logInImmediately',
      loginEmailFocus: false,
      loginPassFocus: false,
      nameFocus: false,
      emailFocus: false,
      codeFocus: false,
      passFocus: false,
    }
  },
  created() {
    this.pageData();
  },
  computed: {

  },
  watch: {

  },
  methods: {
    pageData() {
      if (this.$route.query.type == 'register') this.loginView = false;
    },
    changeView: function(bool) {
      this.loginView = bool;
      this.VerificationState = {
        username: 0,
        email: 0,
        code: 0,
        pwd: 0
      };
      //清除错误信息
      this.errTip = '';
    },
    //邮箱验证
    emailVerification() {
      var inputData;
      const _this = this;
      if (this.loginView) {
        inputData = this.loginData;
      } else {
        inputData = this.registerData;
      }
      var emailRule = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      if (inputData.email == '') {
        this.VerificationState.email = 1;
        this.errTip = this.$t('login.pleaseInputYourEmail');
        return false;
      } else if (!emailRule.test(inputData.email)) {
        this.VerificationState.email = 2;
        this.errTip = this.$t('login.emailFormatIsIncorrect');
        return false;
      } else {
        this.VerificationState.email = 3;
        this.errTip = '';
        return true;
      }
    },
    //密码验证
    pwdVerification() {
      var inputData;
      const _this = this;
      if (this.loginView) {
        inputData = this.loginData;
      } else {
        inputData = this.registerData;
      }
      if (inputData.pwd == '') {
        this.VerificationState.pwd = 1;
        this.errTip = this.$t('login.pleaseEnterYourPassword');
        return false;
      } else if (!/^\S{6,}$/.test(inputData.pwd)) {
        this.VerificationState.pwd = 2;
        this.errTip = this.$t('login.passwordIsAtLeast6Digits');
        return false;
      } else {
        this.VerificationState.pwd = 3;
        this.errTip = '';
        return true;
      }
    },
    //用户名验证
    nameVerification() {
      const _this = this;
      const registerData = this.registerData;
      if (registerData.username == '') {
        this.VerificationState.username = 1;
        this.errTip = this.$t('login.pleaseEnterUserName');
        return false;
      } else if (!/^\S{4,}$/.test(registerData.username)) {
        this.VerificationState.username = 2;
        this.errTip = this.$t('login.theUserNameIsNotLessThan4Characters');
        return false;
      } else {
        this.VerificationState.username = 3;
        this.errTip = '';
        return true;
      }
    },
    //验证码验证
    codeVerification() {
      const _this = this;
      const registerData = this.registerData;
      if (registerData.code == '') {
        this.VerificationState.code = 1;
        this.errTip = this.$t('login.pleaseEnterVerificationVode');
        return false;
      } else if (!/^[0-9]{6}$/.test(registerData.code)) {
        this.VerificationState.code = 2;
        this.errTip = this.$t('login.TheVerificationCodeIsA6DigitValidNumber');
        return false;
      } else {
        this.VerificationState.code = 3;
        this.errTip = '';
        return true;
      }
    },
    register: function() {
      var _this = this;
      //是否同意协议
      if (this.affirm && this.nameVerification() && this.emailVerification() && this.codeVerification() && this.pwdVerification()) {
        //判断注册模块是否验证正确
        register(_this.registerData.username, _this.registerData.email, _this.registerData.code, _this.registerData.pwd).then(
          data => {
            if (data.success) {
              //注册成功
              _this.$parent.$refs.confirm.show(data.msg, false, function() {
                _this.loginData.email = _this.registerData.email;
                _this.changeView(true);
              });
            } else {
              _this.errTip = data.msg;
            }
          }
        )
      }
    },
    login: function() {
      var _this = this;
      if (this.emailVerification() && this.pwdVerification()) {
        this.loginBut = 'login.loggingIn'
        login(_this.loginData.email, _this.loginData.pwd).then(
          data => {
            if (data.success == true) {
              _this.loginBut = 'login.logInImmediately';
              data.data.email = _this.loginData.email;
              _this.$store.commit('setUserinfo', data.data);
              _this.$store.commit('setLogin', true);
              _this.$router.push({ path: '/index' });
              _this.$parent.cartNum();
            } else {
              _this.errTip = data.msg;
              _this.loginBut = 'login.logInImmediately';
            }
          }
        )
      }
    },
    getCodeState() {
      const _this = this;
      this.readonly = true;
      this.codeS = '60';
      this.codeText = 'login.afterTheReSend';
      var s = 60;
      clear = setInterval(() => {
        s--;
        _this.codeS = s;
        if (s == 0) {
          clearInterval(clear);
          this.codeS = '';
          _this.codeText = "login.getVerificationVode";
          _this.readonly = false;
        }
      }, 1000);
    },
    getCode: function() {
      var _this = this;
      if (_this.readonly) {
        this.errTip = _this.$t('login.messageHasBeenSent');
      } else if (this.emailVerification()) {
        getCode(3001, _this.registerData.email).then(
          data => {
            if (data.success == true) {
              _this.getCodeState();
            } else {
              _this.errTip = data.msg;
            }
          }
        )
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/components/main';
.head {
  height: 130px;
  .page-center {
    padding-left: 10px;
  }
}

.content {
  height: 640px;
  width: 100%;
  background-image: url(../../img/login/dly_bg.png);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .inputBox {
    border: 1px solid #e6e6e6;
    position: relative;
    display: flex;
    label {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 45px;
    }
    input {
      border: 0px;
      padding: 0px 5px;
      background-color: #FFF;
      width: 100%;
    }
    input::-ms-clear,
    input::-ms-reveal {
      display: none;
    }
    span.state {
      position: absolute;
      top: 0px;
      right: 0px;
      width: 45px;
    }
  }
  .getFocus {
    border: 1px solid #FF6454;
  }
  .login .inputBox {
    margin-bottom: 20px;
    * {
      height: 45px;
    }
    input {
      padding: 0px 45px;
    }
  }
  .register .inputBox {
    margin-bottom: 10px;
    * {
      height: 42px;
    }
    input {
      padding: 0px 10px;
    }
  }
  .login-box {
    width: 370px;
    height: 420px;
    float: right;
    background: #fff;
    margin-top: 111px;
    margin-right: 50px;
    .near-center {
      display: flex;
      &>div {
        flex: 1;
        -webkit-box-flex: 1;
        text-align: center;
        &:first-child {
          border-right: 1px solid #d0d0d0;
        }
      }
    }

    .show-item {
      margin: 25px 0 19px;
      font-size: 22px;
      color: #666;
      &>div.act {
        color: $main-color;
        font-weight: bold;
      }
      .login-btn {}
      .register-btn {}
    }
    .login-tip {
      height: 17px;
      padding-left: 25px;
      margin-bottom: 14px;
      font-size: rem(12);
      color: #666;
    }
    .tip-box-affirm {
      padding-left: 0px;
      margin: 7px 0 0 0;
    }
    .login,
    .register {
      padding: 0 25px;
    }
    .get-code {
      height: 38px;
      line-height: 38px;
      margin-top: 2px;
      margin-right: 2px;
      padding: 0px 8px;
      text-align: center;
      width: 112px;
      color: #fff;
    }
    #login,
    #register {
      height: 46px;
      line-height: 46px;
      text-align: center;
      font-size: rem(16);
      color: #fff;
      margin-top: 50px;
      border-radius: 4px;
      &.ui-bc-ccc {
        background-color: #ccc !important;
      }
    }
    #register {
      margin-top: 16px;
    }
    .b-operate {
      font-size: rem(14);
      color: #999;
      margin-top: 36px;
      &>div:first-child {
        padding-right: 24px;
      }
      &>div:nth-child(2) {
        padding-left: 24px;
      }
      div:hover {
        color: #FF6454;
      }
    }
  }
  .my_login {
    width: 395px;
  }
}

.foot {
  height: 210px;
  padding-bottom: 34px;
  background: #fff;
  font-size: 14px;
  color: #808080;
}

.user-agreement {
  width: 808px;
  height: 618px;
  background: #fff;
  font-size: 14px;
  color: #222;
  .box-title {
    height: 36px;
    line-height: 36px;
    background-color: #f5f3f2;
    padding: 0 10px;
    margin: 4px 4px 0;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    span {
      font-size: 24px;
      color: #999;
      cursor: pointer;
    }
  }
  .box-content {
    margin: 12px 16px 20px 24px;
    padding-right: 10px;
    max-height: 448px;
    overflow-y: auto;
    .b-c-title {
      margin-top: 3px;
      height: 28px;
      line-height: 28px;
    }
    p:not(.b-c-title) {
      font-size: 12px;
      color: #555;
      line-height: 20px;
    }
  }
  .agreed {
    width: 262px;
    height: 60px;
    margin: 11px auto 0;
    font-size: 18px;
    line-height: 60px;
    color: #fff;
    text-align: center;
  }
}

.ic-logo {
  width: 180px;
  height: 66px;
}

.ic-common {
  @include bindicBg(14px, 14px);
  margin-right: 8px;
}

.ic-error {
  color: #FF6454 !important;
  span {
    @extend .ic-common;
    background-image: url(../../img/login/dly_icon_msg.png);
  }
}

.ic-affirm {
  @extend .ic-common;
  cursor: pointer;
  background-image: url(../../img/login/dly_icon_msg_woyiyuedu.png);
}

.ic-affirm.not {
  background-image: url(../../img/login/dly_icon_msg_w.png);
}

.ic-true {
  background: url(../../img/login/dly_icon_msg_chenggong.png);
  background-size: 16px 16px;
  background-repeat: no-repeat;
  background-position: center center;
}

.ic-delete {
  background-image: url(../../img/login/delete_disselect.png);
  background-size: 16px 16px;
  background-repeat: no-repeat;
  background-position: center center;
  &.selected {
    background-image: url(../../img/login/delete_selected.png);
  }
}

.ic-email {
  background: url(../../img/login/dly_-icon_email.png) no-repeat;
  background-size: 19px 12px;
  background-position: center center;
}

.ic-pwd {
  background: url(../../img/login/dly_-icon_password.png) no-repeat;
  background-size: 14px 18px;
  background-position: center center;
}
</style>
