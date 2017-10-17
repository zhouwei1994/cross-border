<template>
  <div class="about-us">
    <div class="page-adr">
      <div class="page-center ub ub-ac">
        {{$t('head.home')}}>{{$t('head.aboutUs')}}
      </div>
    </div>
    <div class="page-center">
      <div class="c-title">{{$t('head.aboutUs')}}</div>
      <div class="content" v-if="$i18n.locale == 'zh_CN'">
        <div class="title">我们</div>
        <div class="content-detail">
          泰国TPI国际物流有限公司成立于2003年，总部曼谷，市值将近3亿泰铢拥有12家分公司，运作团队超过200人，已成为泰国领先的物流企业。主要业务 是中泰缅老挝海陆集装箱运输及清关服务。
        </div>
        <div class="title right">理念</div>
        <div class="content-detail">
          公司坚守把客户服务与态度放在首位，重视人才培养与运用，不断扩建仓储 面积和车队，保障运输安全、时效快捷。在2014年TPI十周年节点，投资2亿 泰铢建设的曼谷物流配送中心隆重投入使用。
        </div>
        <div class="title">创新</div>
        <div class="content-detail">
          占地1万平方米，行政办公和仓储配送都实现了飞跃提升。援引董事长叶欧 平先生的讲话：“时不我待，要升级。”时间见证了诺基亚和苹果的走向， 企业的前瞻性决定未来，创新改革才不会被成为历史。
        </div>
        <div class="title right">未来</div>
        <div class="content-detail">
          随着中国提出的“一带一路”发展战略，亚投行的创建，都表明了发展亚洲 经济的决心和信心。这其中，ＴＰＩ作为资深泰国企业，辐射中国缅甸，承 担着重要的物流运输任务，为构建更加贯通顺畅的国际物流网络，将做出不 懈努力。
        </div>
        <div class="title center">10 个您选择tpi-preorder服务的理由</div>
        <div class="content-list">
          <ul>
            <li>合适的运费</li>
            <li>您可以24小时跟踪查询货物状态</li>
            <li>送货到门</li>
            <li>在线订购系统，您可以在随时订购</li>
            <li>值得信赖，请您放心运输途中的可靠性，我们拥有专业的储存仓库，产品不会丢失</li>
            <li>优秀的服务，我们拥有优良运输服务，重视客户，拥有系统的工作流程，工作人员有良好的职业素养</li>
            <li>快捷安全，我们拥有高效的运输速度，以及完善的网络查询,还能为您的产品提供仓储服务</li>
            <li>多种联系方式，您可以通过电话、电子邮件、微信、在线咨询等联系我们，为您随时可以询问</li>
            <li>拥有明确的地址，我们公司有具体的地址，可以方便您来公司详细沟通了解</li>
            <li>有具体的收费明细，拥有明确的进出口资费标准，且不会有其他隐藏费用。运输时间确保在规定时间内达到</li>
            <li>(不可抗力因素除外，如自然灾害，国家政策等）</li>
          </ul>
        </div>
      </div>

      <div class="content" v-if="$i18n.locale == 'en'">
        <div class="title">we</div>
        <div class="content-detail">
          Thailand TPI International Logistics Co., Ltd. was established in 2003, the headquarters of Bangkok, the market value of nearly 300 million baht has 12 branches, the operation team of more than 200 people, has become Thailand's leading logistics enterprises. The main business is in Thailand and Thailand Laos sea and land container transport and customs clearance services.
        </div>
        <div class="title right">idea</div>
        <div class="content-detail">
          Companies adhere to the customer service and attitude in the first place, attention to personnel training and use, and constantly expand the storage area and the fleet, to ensure transport safety, quick and efficient. In the 2014 TPI tenth anniversary node, invest 200 million baht building in Bangkok logistics and distribution center a grand put into use.
        </div>
        <div class="title">Innovation</div>
        <div class="content-detail">
          Covers an area of 10,000 square meters, administrative office and warehousing and distribution have achieved a leap to upgrade. Quoted Mr. Ye Youping, chairman of the speech: "I will not wait, to upgrade." Time witnessed the trend of Nokia and Apple, the enterprise's forward-looking decision in the future, innovation and reform will not be history.
        </div>
        <div class="title right">future</div>
        <div class="content-detail">
          With China's "one side along the way" development strategy, the creation of ADB, have shown the development of the Asian economy's determination and confidence. Among them, TPI as a senior Thai enterprises, radiation China Myanmar, bear an important logistics and transport tasks, in order to build a more smooth and smooth international logistics network, will make unremitting efforts.
        </div>
        <div class="title center">10 reasons you choose tpi-preorder service</div>
        <div class="content-list">
          <ul>
            <li>The appropriate shipping</li>
            <li>You can check the status of the goods 24 hours a day</li>
            <li>Delivery to the door</li>
            <li>Order online system, you can order at any time</li>
            <li>Trustworthy, please rest assured that the reliability of transit, we have a professional storage warehouse, the product will not be lost</li>
            <li>Excellent service, we have excellent transport services, attention to customers, with the system of work processes, the staff have a good professionalism</li>
            <li>Fast and safe, we have efficient transportation speed, and improve the network query, but also for your products to provide warehousing services</li>
            <li>A variety of contact information, you can by phone, e-mail, WeChat, online consultation, etc. for you at any time you can ask</li>
            <li>Have a clear address, our company has a specific address, you can facilitate the company to communicate in detail to understand</li>
            <li>There are specific charges detail, with a clear import and export tariffs, and there will be no other hidden costs. The transport time is guaranteed to be within the specified time</li>
            <li>(Except for force majeure factors such as natural disasters, national policies, etc.)</li>
          </ul>
        </div>
      </div>

      <div class="content" v-if="$i18n.locale == 'th'">
        <div class="title">เรา</div>
        <div class="content-detail">
          บริษัท ทีพีไอ. อิมปอร์ต-เอ็กซ์ปอร์ต แอนด์ ชิปปิ้ง จำกัด ก่อตั้งเมื่อ ปี พ.ศ. 2546 โดยมีสำนักงานใหญ่ตั้งอยู่ที่กรุงเทพฯ มีมูลค่าตลาดเกือบ 300 ล้านบาท มีสำนักงานสาขา 12 แห่ง โดยทีมงานกว่า200คน ปัจจุบันได้กลายเป็นบริษัทโลจิสติกส์ชั้นนำในประเทศไทย ซึงธุรกิจหลักคือการขนสินค้าทางเรือ-รถ ระหว่าง จีน ไทย พม่า ลาว รวมทั้งการเดินพิธีการศุลกากร
        </div>
        <div class="title right">แนวคิด</div>
        <div class="content-detail">
          เรายึดมั่นในการบริการลูกค้าและทัศนคติเป็นสิ่งแรก ให้ความสำคัญในการฝึกอบรมและการใช้บุคลากร โดยไม่หยุดจะจะขยายพื้นที่จัดเก็บสินค้าและทีมงาน รับประกันความปลอดภัยในการขนส่ง สะดวก รวดเร็ว ในปี พ.ศ. 2557 ครบรอบปีที่10 ของเราได้ใช้เงินลงทุนในการก่อสร้างศูนย์กระจายสินค้าและคลังสินค้าในกรุงเทพฯมูลค่า 200 ล้านบาท
        </div>
        <div class="title">นวัตกรรม</div>
        <div class="content-detail">
          ครอบคลุมพื้นที่ 10,000 ตารางเมตร สำนักงานและคลังสินค้าและจัดส่งสินค้าเป็นไปอย่างก้าวกระโดด ดังที่ Mr. Ye Ouping ประธานคณะกรรมการ ได้กล่าวไว้ว่า"เวลาไม่เคยรอ เราจึงต้องพัฒนา" เวลาได้พิสูจน์ให้เห็นถึงทิศทางของโนเกียและแอปเปิ้ล นวัตกรรมในอนาคตของบริษัท ที่จะมาปฏิรูปครั้งใหม่ไม่ให้กลายเป็นความล้าสมัย

        </div>
        <div class="title right">อนาคต</div>
        <div class="content-detail">
          โดยยุทธศาสตร์การพัฒนาของจีนที่กล่าวไว้ว่า“นโยบาย 1 แถบ 1 เส้นทาง"( One Belt and One Road） ต่างแสดงให้เห็นถึงความมุ่งมั่นและความเชื่อมั่นของการพัฒนาทางเศรษฐกิจของเอเชีย ในระหว่างนี้TPIได้กลายเป็นระดับผู้นำของธุรกิจของประเทศไทย และได้ขยายตัวไปประเทศจีนและพม่า ดำเนินงานขนส่งที่สำคัญ เพื่อเป็นการสร้างระบบขนส่งออนไลน์ที่ราบรื่นและพัฒนาอย่างต่อเนื่อง

        </div>
        <div class="title center">10 เหตุผลที่คุณควรเลือกบริการ tpi-preorder</div>
        <div class="content-list">
          <ul>
            <li>ค่าขนส่งเหมาะสม</li>
            <li>คุณสามารถติดตามตรวจสอบสถานะสินค้าได้ตลอด 24 ชั่วโมง</li>
            <li>ส่งสินค้าถึงบ้าน</li>
            <li>ระบบการสั่งซื้อออนไลน์ คุณสามารถทำการสั่งซื้อได้ทุกเวลา</li>
            <li>คุ้มค่า น่าเชื่อถือ ลูกค้าสามารถไว้วางใจในการขนส่งได้ สินค้าไม่สูญหาย มีคลังสินค้าในการรองรับสินค้า</li>
            <li>เรามีบริการด้านการขนส่งที่ยอดเยี่ยม ให้ความสำคัญกับลูกค้า มีขั้นตอนการทำงานที่เป็นระบบพนักงานมีความเป็นมืออาชีพ</li>
            <li>สะดวก ปลอดภัย เรามีความเร็วการขนส่งที่มีประสิทธิภาพรวมทั้งการตรวจสอบออนไลน์ที่สมบูรณ์แบบ ทั้งยังมีบริการคลังสินค้าเก็บสินค้าให้คุณ</li>
            <li>ติดต่อสื่อสารได้หลายช่องทาง คุณสามารถติดต่อได้ทั้งทางโทรศัพท์ อีเมล เเชท เพื่อให้คุณสามารถสอบถามได้ตลอดเวลา</li>
            <li>มีที่อยู่ชัดเจน บริษัทของเรามีที่อยู่อย่างชัดเจนสามารถติดต่อสื่อสารได้สะดวกสบาย</li>
            <li>มีการระบุค่าใช้จ่ายชัดเจน มีการระบุค่าใช้จ่ายในการนำเข้าชัดเจน ไม่มีปิดบังค่าใช้จ่ายอื่นๆ รวมถึงระยะเวลาในการจัดส่ง</li>
            <li>(ยกเว้นเหตุสุดวิสัย เช่น ภัยธรรมชาติ นโยบายของประเทศ ฯลฯ）</li>
          </ul>
        </div>
      </div>

      <div class="content" v-if="$i18n.locale == 'lo'">
        <div class="title">ເຮົາ</div>
        <div class="content-detail">
          ບໍລິສັດທີພິໄອຂົນສົ່ງສາກົນປະເທດໄທຈໍາກັດໄດ້ສ້າງຕັ້ງຂື້ນປີ2003 ສຳນັກງານໃຫ່ຍຕັ້ງຢູ່ກຸ່ມເທບ.ມູນຄ່າຂອງຕະຫລາດເກືອບ300ລ້ານບາດທັງໝົດ. ມີສໍານັກງານສາຂາ12ແຫ່ງໂດຍມີພະນັກງານກວ່າ200ຄົນປັດຈຸບັນ ໄດ້ກາຍເປັນບໍລິສັດໂລຈິດຕິກຊັ້ນນໍາໃນປະເທດໄທ.ຊຶງທຸລະກິດຕົ້ນຕໍແມ່ນການ ຂົນສົ່ງສິນຄ້າທາງບົກແລະທາງທະເລລະຫວ່າງຈີນໄທມຽນມາລາວການຂົນສົ່ງ ລວມທັງ ບໍລິການຂົນສົ່ງສິນຄ້າດ້ວຍ ຕູ້ຄອນເທເນີ້ແລະບໍລິການແຈ້ງພາສີ

        </div>
        <div class="title right">ແນວຄິດ</div>
        <div class="content-detail">
          ເຮົາຍຶດຫມັ້ນໃນການບໍລິການລູກຄ້າແລະທັດນະຄະຕິເປັນສິ່ງທໍາອິດໃຫ້ຄວາມສໍາຄັນໃນການຝຶກອົບຮົມແລະການໃຊ້ບຸຄະລາກອນ.ໂດຍການສືບຕໍ່ຈະຂະຫຍາຍພື້ນທີ່ຈັດເກັບສິນຄ້າແລະທີມວຽກ.ການຮັບປະກັນຄວາມປອດໄພໃນການຂົນສົ່ງ ວ່ອງໄວ.ໃນປີ2014ຄົບຮອບປີທີ່10ຂອງເຮົາໄດ້ໃຊ້ເງິນລົງທຶນໃນການກໍ່ສ້າງສູນກະຈາຍສິນຄ້າແລະຄັງສິນຄ້າໃນກຸງເທບມູນຄ່າ 200 ລ້ານບາດ

        </div>
        <div class="title">ນະວັດກໍາ</div>
        <div class="content-detail">
          ຄອບຄຸມພື້ນທີ່10,000ຕາລາງແມັດ.ສຳນັກງານແລະຄັງສິນຄ້າແລະຈັດສົ່ງສິນຄ້າເປັນໄປຢ່າງກ້າວກະໂດດຂັ້ນດັງທີ່.ທ່ານMrYeOupingປະທານຄະນະກໍາມະການໄດ້ກ່າວໄວ້ວ່າ"ເວລາບໍ່ເຄີຍລໍຖ້າເຮົາຈຶ່ງຕ້ອງພັດທະນາ"ເວລາໄດ້ພິສູດໃຫ້ເຫັນ ເຖິງທິລະທາງຂອງໂນເກຍແລະແອບເປີ້ນນະວັດກໍາໃນອະນາຄົດຂອງບໍລິສັດທີ່ ຈະມາປະຕິຮູບຄັ້ງໃຫມ່ບໍ່ໃຫ້ກາຍເປັນຄວາມຫລ້າສະໄຫມ

        </div>
        <div class="title right">ອະນາຄົດ</div>
        <div class="content-detail">
          ໂດຍຍຸດທະສາດການພັດທະນາຂອງຈີນທີ່ກ່າວໄວ້ວ່າ"ຫນຶ່ງແລວທາງຫນຶ່ງເສັ້ນ ທາງ"(OneBeltandOneRoad)ຕ່າງສະແດງໃຫ້ເຫັນເຖິງຄວາມມຸ່ງຫມັ້ນແລະ ຄວາມເຊື່ອຫມັ້ນຂອງການພັດທະນາທາງເສດຖະກິດຂອງເອເຊຍ.ໃນລະຫວ່າງນີ້TPIໄດ້ກາຍເປັນລະດັບຜູ້ນໍາຂອງທຸລະກິດຂອງປະເທດໄທແລະໄດ້ຂະຫຍາຍຕົວໄປປະເທດຈີນແລະມຽນມາດໍາເນີນວຽກຂົນສົ່ງທີ່ສໍາຄັນເພື່ອເປັນການສ້າງລະບົບຂົນສົ່ງອອນລາຍທີ່ກ້າວໜ້າແລະພັດທະນາຢ່າງຕໍ່ເນື່ອງ

        </div>
        <div class="title center">10ເຫດຜົນທີ່ທ່ານຄວນເລືອກບໍລິການtpi-preorder</div>
        <div class="content-list">
          <ul>
            <li>ຄ່າຂົນສົ່ງເຫມາະສົມ</li>
            <li>ຄຸນສາມາດຕິດຕາມກວດສອບສະຖານະການສິນຄ້າໄດ້ຕະຫຼອດ 24 ຊົ່ວໂມງ</li>
            <li>ສົ່ງສິນຄ້າເຖິງບ້ານ</li>
            <li>ລະບົບການສັ່ງຊື້ອອນລາຍຄຸນສາມາດເຮັດການສັ່ງຊື້ໄດ້ທຸກເວລາ</li>
            <li>ຄຸ້ມຄ່າຫນ້າເຊື່ອຖື.ລູກຄ້າສາມາດໄວ້ວາງໃຈໃນການຂົນສົ່ງສິນຄ້າບໍ່ສູນຫາຍມີຄັງສິນຄ້າໃນການຮອງຮັບສິນຄ້າ</li>
            <li>ເຮົາມີບໍລິການດ້ານການຂົນສົ່ງທີ່ຍອດຢ້ຽມໃຫ້ຄວາມສໍາຄັນກັບລູກຄ້າມີຂັ້ນຕອນການເຮັດວຽກທີ່ເປັນລະບົບພະນັກງານມີຄວາມເປັນມືອາຊີບ</li>
            <li>ສະດວກປອດໄພ.ເຮົາມີຄວາມວ່ອງໄວໃນການຂົນສົ່ງທີ່ມີປະສິດທິພາບລວມທັງການກວດສອບອອນລາຍທີ່ສົມບູນແບບທັງຍັງມີບໍລິການຄັງສິນຄ້າເກັບສິນຄ້າໃຫ້ທ່ານ</li>
            <li>ຕິດຕໍ່ສື່ສານໄດ້ຫລາຍຊ່ອງທາງ.ທ່ານສາມາດຕິດຕໍ່ໄດ້ທັງທາງໂທລະສັບ. ອີເມວ. ແຊັດເພື່ອໃຫ້ທ່ານສາມາດສອບຖາມໄດ້ຕະຫຼອດເວລາ</li>
            <li>ມີທີ່ຢູ່ຊັດເຈນບໍລິສັດຂອງເຮົາ.ມີທີ່ຢູ່ຢ່າງຊັດເຈນ.ທ່ານສາມາດຕິດຕໍ່ສື່ສານໄດ້ ສະດວກສະບາຍ</li>
            <li>ມີການລະບຸຄ່າໃຊ້ຈ່າຍຊັດເຈນມີການລະບຸຄ່າໃຊ້ຈ່າຍໃນການນໍາເຂົ້າຊັດເຈນບໍ່ມີປິດບັງຄ່າໃຊ້ຈ່າຍອື່ນ ໆ ລວມເຖິງໄລຍະເວລາໃນການຈັດສົ່ງ</li>
            <li>(ຍົກເວັ້ນເຫດສຸດວິໄສເຊັ່ນໄພທໍາມະຊາດນະໂຍບາຍຂອງປະເທດ )</li>
          </ul>
        </div>
      </div>
      <div class="content" v-if="$i18n.locale == 'my'">
        <div class="title">ကြ်န္ေတာ္တို ့</div>
        <div class="content-detail">
          ထိုင္း TPI ႏိုင္ငံတကာေထာက္ပံ့ပို ့ေဆာင္ေရး Co. ,Ltd. သည္ ေစ်းကြက္တန္ဖိုး ဘတ္ေငြ သန္း300 ၊ ရံုးခြဲ 12 ခု ႏွင့္ ၀န္ထမ္းအင္အား 200 ေက်ာ္ျဖင့္ 2003 ခုႏွစ္တြင္ ဘန္ေကာက္ျမိဳ ့တြင္စတင္တည္ေထာင္ခဲ့သည္။ထိုင္းႏိုင္ငံဧ။္ထင္ရ်ားေသာ ပို ့ေဆာင္ ေထာက္ပံ့ေရး company မ်ားအနက္မွ တစ္ခုျဖစ္လာသည္။ အဓိကစီးပြားေရးလုပ္ငန္းသည္ ထိုင္း ၊ျမန္မာ ၊ လာအို ႏွင့္ တရုတ္ႏိုင္ငံတို ့ကို ေရေျကာင္းကြန္တိန္နာ ပို ့ေဆာင္ေရးႏွင့္ ကုန္လမ္း ကုန္စည္ပို ့ေဆာင္ေရး အေကာက္ခြန္ လုပ္ငန္းမ်ားရွင္းလင္းေဆာင္ရြက္ေပးေရး၀န္ေဆာင္မွဳျဖစ္ပါသည္။
        </div>
        <div class="title right">ရည္ရြယ္ခ်က္</div>
        <div class="content-detail">
          ကြ်ႏ္ုပ္တို ့ Company  သည္အသံုးျပဳသူကိုဦးစားေပးသည့္၀န္ေဆာင္မွဳျဖစ္သည္။ကြ်မ္းက်င္ေသာ၀န္ထမ္းမ်ား
အားခန့္အပ္ ရ်္ ေကာင္းမြန္လ်င္ျမန္ေသာ၀န္ေဆာင္မွဳေပးျခင္း ကုန္စည္သိုေလွာင္ရန္အတြက္ လစ္ဟာမွဳမရွိ
ေစရန္ ဂိုလ္ေထာင္မ်ားအား တိုးခ်ဲ့ျခင္း လံုျခံဳစိတ္ခ်ရေသာ အေတြ ့အျကံုရွိေသာယာဥ္ေမာင္းမ်ားႏွင့္ သစ္လြင္
ရ်္ စိတ္ခ်ယံုျကည္ရေသာ ကုန္တင္ယာဥ္မ်ားအားအသံုးျပဳရွ္ သယ္ယူပို ့ေဆာင္ေပးေနပါသည္။ TPI ဧ။္ ၁၀ႏွစ္
ျပည့္ႏွစ္မွစရ်္ ဘတ္ေငြ သန္း200 ထပ္မံရင္းႏွီးျမဳပ္ႏွံ ရ်္ ကုန္စည္သိုေလွာင္ေသာ ဂိုလ္ေထာင္မ်ားအားထပ္မံ
တိုးခ်ဲ့ ရဲ့ ၀န္ေဆာင္မွဳေပးေနပါသည္။
        </div>
        <div class="title">Company ဧ။္ တီထြင္ဆန္းသစ္ျခင္း</div>
        <div class="content-detail">
          Company  ဧ။္ ရံုးခ်ဳပ္ႏွင့္ သိုလ္ေလွာင္ရံုသည္ 10000 ဧရိယာ စတုရန္းမီတာရွိပါသည္။
Nokiea နဲ ့Apple က အခ်ိန္သက္ေသအနာဂါတ္ အတြက္ ဆန္းသစ္တီထြင္မွဳ ႏွင့္ ျပုျပင္ေျပာင္းလဲေရး ရွာေဖြေနေသာ  Company မ်ားဧ။္သမိုငး္ျဖစ္လိမ့္မည္၊ ထို ့ေျကာင့္ သင္ သည္ေျပာင္းလဲဖို ့အတြက္ မည္သူ ့ကိုမွ်ေစာင့္ဖို ့မလိုေပ
             ( ဥကဌ မစ္စတာရဲပင္း ဧ။္မိန္ ့ခြန္းမွ ေကာက္ႏွဳတ္ခ်က္)
        </div>
        <div class="title right">အနာဂါတ္</div>
        <div class="content-detail">
          ဖြံ ့ျဖိဳးတိုးတက္ေရး မဟာဗ်ဴဟာ လမ္းစဥ္တစ္ေလွ်ာက္  ေရွ ့မွဦးေဆာင္ေနေသာ တရုတ္ႏိုင္ငံ ႏွင့္ အာရွစီးပြားေရးဖြံ ့ျဖိဳးတိုးတက္မွဳအတြက္ ျပဌာန္းခြင့္ ၊ ကိုယ္ပိုင္ရင္းႏွိးျမဳပ္ႏွံမႈဘဏ္မ်ားဖန္တီးျခင္း ႏွင့္ ယံုျကည္စိတ္ခ်မႈသရုပ္ျပပါျပီ။ထိုအမ်ားထဲတြင္ တစ္ဦးပိုင္ အျကီးစားစီးပြားေရးလုပ္ငန္းမ်ား ၊ တရုတ္ ႏွင့္ ျမန္မာ လ်င္ျမန္ေသာကုန္သြယ္မႈ TPI သည္ ႏိုင္ငံတကာ ေထာက္ပံ့ပို ့ေဆာင္ေရးကြန္ရက္မွတဆင့္ ပိုမိုျမန္ဆန္ေစရန္ တစ္ဦးပိုင္မွ Zhao Eႏွင့္ Cheng စေသာ ေထာက္ပံ့ေရး အဖြဲ့အစီးမ်ားႏွင့္ပူေပါင္းျပီးပါျပီ။
        </div>
        <div class="title center">TPI ျကိုတင္မွာယူ၀န္ေဆာင္မႈ သံုးသင့္သည့္အေျကာင္းျပခ်က္ 10 ခ်က္ </div>
        <div class="content-list">
          <ul>
            <li> သင့္ေလ်ာ္ေသာသယ္ေဆာင္ခ</li>
            <li>သင္သည္ သင္မွာယူေသာကုန္စည္အေျကာင္းကို ၂၄ နာရီ စံုစမ္းႏိုင္ျခင္း။</li>
            <li>အိမ္အေရာက္ပိုေဆာင္မွဳ</li>
            <li>သင္သည္အြန္လိုင္းအသံုးျပဳျပီး မည္သည့္အခ်ိန္မဆို စံုစမ္းႏိုင္ပါသည္</li>
            <li>လံုျခံဳစိတ္ခ်ရေသာ စြမ္းရည္ျမင့္မားသည့္၀န္းထမ္းမ်ားတာ၀န္ထမ္းေဆာင္ေနသည့္ဂိုလ္ေထာင္ရွိျခင္း
ေျကာင့္ ကုန္စည္ ေရြ ့ေျပာင္းျခင္းအမ်ားတြင္ သင္ဧ။္ကုန္စည္ပ်က္စီးေပ်ာက္ဆံုးမႈမျဖစ္ေပၚျခင္း။</li>
            <li>က်ေနာ္တို ့ဧ။္ အလြန္ေကာင္းမြန္ေသာ၀န္ေဆာင္မႈ ေဖာက္သည္မ်ားအား အာရံုစူးစိုက္မႈေကာင္းေသာ၀န္ထမ္းေကာင္းမ်ားႏွင့္ အဆင္ေျပေခ်ာေမြ ့ေသာ ကုန္စည္       ပို ေဆာင္မႈစနစ္မ်ားရွိျခင္းျဖစ္ပါသည္။</li>
            <li>ေဘးကင္းလံုျခံဳျခင္းႏွင့္ေစ်းႏွဳန္းသက္သာျခင္း အျမန္ဆံုးပို ့ေဆာင္ေရးစနစ္ရွိသည္၊ စံုစမ္းေမးျမန္းခ်က္ ေကာင္းမြန္ေသာ ထုတ္ကုန္သိုေလွာင္မွဳမ်ားလည္း ၀န္ေဆာင္မွဳေပးသည္။</li>
            <li>ဆက္သြယ္ရန္အမ်ိဳးစံုေသာနည္းလမ္းမ်ား သင္ဧ။္ ဖုန္း ။ အီးေမးလ္ ၊ Wechat ၊အြန္လိုင္းတို ့မွတိုင္ပင္ေဆြးေႏြးမည္ ျဖစ္ပါသျဖင့္ သင္တို ့ကိုယ္တိုင္ဆက္သြယ္ႏိုင္ပါသည္။</li>
            <li>Company ဧ။္လိပ္စာအတိအက်ရွိျခင္းေျကာင့္ လာေရာက္လည့္လာစံုစမ္းေမးျမန္းႏိုင္ျခင္း</li>
            <li>ေရေျကာင္းသယ္ယူပို့ေဆာင္ေရးအတြက္ သတ္မွတ္ေသာအခ်ိန္တြင္းေရာက္ရွိရန္ အခ်ိန္ေသခ်ာေပးျခင္း
သြင္းကုန္ႏွင့္ ပို ့ကုန္ မ်ားကို စံခ်ိန္စံညႊန္းႏွင့္ အခြန္ရွင္းရွင္းလင္းလင္း ျဖင့္အပို ကုန္က်စရိတ္မရွိပါ။</li>
            <li>(ဥပမာ သဘာ၀ေဘး အန္တရာယ်, အမ်ိဳးသားေရးမူ၀ါဒမ်ား , အျကမ္းဖက္မွဳမ်ားစသည္တို ့မွလြဲရ်္)</li>
          </ul>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
    }
  },
  created() {

  },
  computed: {

  },
  watch: {

  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
@import '../../style/components/main';
.about-us {
  .content {
    background: #fff;
    padding: 30px 265px 50px;
    color: #333;
    min-height: 1430px;
    .title {
      font-size: 20px;
      margin-top: 39px;
      height: 40px;
      line-height: 1;
      padding-bottom: 16px;
      color: $main-color;
      position: relative;
      &.right {
        text-align: right;
      }
      &.center {
        text-align: center;
        margin-top: 119px;
      }
      &::after {
        content: '';
        display: block;
        position: absolute;
        width: 30px;
        height: 2px;
        background-color: $main-color;
        left: 0;
        bottom: 0;
      }
      &.right::after {
        right: 0;
        left: inherit;
      }
      &.center::after {
        display: none;
      }
    }
    .content-detail {
      margin-top: 26px;
      font-size: 18px;
      line-height: 1.5;
    }
    .content-list {
      margin-top: 32px;
      ul {
        list-style: disc;
        padding-left: 10px;
        li {
          font-size: 14px;
          line-height: 20px;
          margin-bottom: 12px;
        }
      }
    }
  }
}
</style>
