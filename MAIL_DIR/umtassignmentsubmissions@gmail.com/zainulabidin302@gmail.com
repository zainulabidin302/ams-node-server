Delivered-To: umtassignmentsubmissions@gmail.com
Received: by 2002:a02:c6cf:0:0:0:0:0 with SMTP id r15csp5875790jan;
        Mon, 26 Nov 2018 07:12:58 -0800 (PST)
X-Received: by 2002:a24:6bd3:: with SMTP id v202-v6mr22928364itc.165.1543245178702;
        Mon, 26 Nov 2018 07:12:58 -0800 (PST)
ARC-Seal: i=1; a=rsa-sha256; t=1543245178; cv=none;
        d=google.com; s=arc-20160816;
        b=0LLKEUFR2bWtGbPFQIA3plMc3ghukiU3pfdoLhJ+6Dp6LoiaR0jaWE7WHkx/IPj1n0
         bhImjhgkf0q7gR9HyTcTKBG66cC0xCJFk9fWJjTVfR2UJ29Ty22XCBJgEiKxgBLH8OUJ
         MrrrMUxWL//vT57pKLr5hjp1XQ7bu9TRcAE/gjcFZBC9LwDDZhzj4YthpSp0PJcsbCXL
         PrlSMcXmAs1ORjPkME9K840tIpH4wRQVvtRTEJABmcyIuYePDnewuHU50zzZ1TsLpMlw
         vEq/eHi6oZKwJfNsDWSgYQCPZuJLsWGM6j5bKF9QLz7bqNxNHvnb4RjTA9lmtDOi29Cl
         GHgQ==
ARC-Message-Signature: i=1; a=rsa-sha256; c=relaxed/relaxed; d=google.com; s=arc-20160816;
        h=to:subject:message-id:date:from:in-reply-to:references:mime-version
         :dkim-signature;
        bh=RzCxeoOZGr7Vf9YV5Gow/b//b7s3GhRXpO1Nq8vJ7F0=;
        b=Aq4orZI4DVdd4tGTKk7oKrXmLo+nTPCuITuemfLRKZ9abV8sRmPyWOb1njdb7WE7Ha
         Do/yvQArS+YC1F16mITDZoNY9G4ymWLaDZRyrClt+ikXarY7AUva/t1Rgi8lzfJnp9JJ
         PDb7R7Q3lFSwNmuuPXCJStIiscBrVeVcWCNd7KHIMnc6ShUcRdnT6uRHc9Y1VarGYRMU
         f3ySLDh/dJGUpwbFvNaIEs5LjGOVc13+jUPqIxUA3QFbJz0RKM7Mh63hAzsGud+apqRa
         gWB15PpeMzoTInIQdkRidCeZtkhG/2GABdahDt8JnbX6Cu/oyuLcnRj0NY/w12bJh/Vk
         Ga1A==
ARC-Authentication-Results: i=1; mx.google.com;
       dkim=pass header.i=@gmail.com header.s=20161025 header.b=uNOguO2B;
       spf=pass (google.com: domain of zainulabidin302@gmail.com designates 209.85.220.41 as permitted sender) smtp.mailfrom=zainulabidin302@gmail.com;
       dmarc=pass (p=NONE sp=QUARANTINE dis=NONE) header.from=gmail.com
Return-Path: <zainulabidin302@gmail.com>
Received: from mail-sor-f41.google.com (mail-sor-f41.google.com. [209.85.220.41])
        by mx.google.com with SMTPS id n62sor352161iof.119.2018.11.26.07.12.58
        for <umtassignmentsubmissions@gmail.com>
        (Google Transport Security);
        Mon, 26 Nov 2018 07:12:58 -0800 (PST)
Received-SPF: pass (google.com: domain of zainulabidin302@gmail.com designates 209.85.220.41 as permitted sender) client-ip=209.85.220.41;
Authentication-Results: mx.google.com;
       dkim=pass header.i=@gmail.com header.s=20161025 header.b=uNOguO2B;
       spf=pass (google.com: domain of zainulabidin302@gmail.com designates 209.85.220.41 as permitted sender) smtp.mailfrom=zainulabidin302@gmail.com;
       dmarc=pass (p=NONE sp=QUARANTINE dis=NONE) header.from=gmail.com
DKIM-Signature: v=1; a=rsa-sha256; c=relaxed/relaxed;
        d=gmail.com; s=20161025;
        h=mime-version:references:in-reply-to:from:date:message-id:subject:to;
        bh=RzCxeoOZGr7Vf9YV5Gow/b//b7s3GhRXpO1Nq8vJ7F0=;
        b=uNOguO2BNYW1EURsGoC7l70+D5ATLIMI+uxJ8gei6Ke17nKV495rA3kNSSv6qBUz53
         QAhYUtCr5c+c0PGi8GoB8s5QLPTDw8Lrc2iIS2WLeGyEyAKEZbJ9YiRNavwN6VkJ39D8
         k9uBmCkiueBge7Jiplx2F79TF9Z8XnAb73xCMGi0IDUG7WuctnsQm5XDWUzu51WTpEO4
         on2V8huRuojMGAwZogFV6uPIh1hbJN/haHSpMLZpxOFqUuoy5i1yix4kMzBt4pI8MNCn
         WeM7zIw53/O9NQDQIUV2jgoE9pKdlWoqaVqhE322FMWIcJ67fJ5QBUQwyGJBGJaYfERo
         m4aw==
X-Google-DKIM-Signature: v=1; a=rsa-sha256; c=relaxed/relaxed;
        d=1e100.net; s=20161025;
        h=x-gm-message-state:mime-version:references:in-reply-to:from:date
         :message-id:subject:to;
        bh=RzCxeoOZGr7Vf9YV5Gow/b//b7s3GhRXpO1Nq8vJ7F0=;
        b=nrYE4QB4j/VTiXx6kOITuQpcz5YcOeS+ZjGxhaUhbQvkm+4DUXrnideDblXMFDAthB
         +qrsvUh1CBJ6yTsj9EV1/oj+Ig85s+eKRANqI7vcH617XSPrU8vTl/LsZMfne3QH8tpc
         GsUMVVL3vFkuYVP0sQViirqiBx1/oYTixUMxEdwZRB0fpp0ediufJm0RYm72KrpqpEPt
         IMRAeCYC6NBgTX/F+ufnzOsJx1H6mAF4usXA5Ivg1kcNaB30RGxnoKwJgIG6endek97d
         w4iP2AWyWYVOBJhMshfPaIH3BXmFE6RrZRMTO+Kqbbwi4vKFK/6kivKWzHKr/EnjQvTI
         0c9w==
X-Gm-Message-State: AGRZ1gIi+DR/WoksulgI5Ch2HUp3QeA7yCWGq1GKcdpJCsIlYMnYC81W
	xadmy7srdYpVa43hJyIM2Qy+bLDrgJXyHoynHEpN1w==
X-Google-Smtp-Source: AFSGD/XaZts1TUvjWDH17JodiHkPXOk61q+/lO2PXszQw1kPeN/6t5jWGUmsGGB9vPNp2cq+bI7GYn4WakXQ6+VTvtM=
X-Received: by 2002:a02:7696:: with SMTP id z144mr23834971jab.102.1543245176675;
 Mon, 26 Nov 2018 07:12:56 -0800 (PST)
MIME-Version: 1.0
References: <CAG4a3wt3We2MJYQwaHj03YbjqciKPb9ptLqQ5mbgHZ9=544VEg@mail.gmail.com>
 <CAG4a3wvv=OBcNi26UyRcPSWjY9CCLB0XShd7Yh91wr60et+arw@mail.gmail.com> <CAG4a3wsqJY6Q783fqKpGKSrN1tn-UCsJE=9DZyvk7aUCJTayQQ@mail.gmail.com>
In-Reply-To: <CAG4a3wsqJY6Q783fqKpGKSrN1tn-UCsJE=9DZyvk7aUCJTayQQ@mail.gmail.com>
From: Zain Ulabidin <zainulabidin302@gmail.com>
Date: Mon, 26 Nov 2018 20:12:43 +0500
Message-ID: <CAG4a3wvni5VQqkP4okVHO_B9TDr111xWrrwL13j4E6fwC2-9pw@mail.gmail.com>
Subject: Re: Assignment
To: "umtassignmentsubmissions@gmail.com" <umtassignmentsubmissions@gmail.com>
Content-Type: multipart/alternative; boundary="0000000000008ea6d1057b92c443"

--0000000000008ea6d1057b92c443
Content-Type: text/plain; charset="UTF-8"

Hello

On Mon, 26 Nov 2018 at 19:55 Zain Ulabidin <zainulabidin302@gmail.com>
wrote:

> Hola
>
> On Mon, 26 Nov 2018 at 19:54 Zain Ulabidin <zainulabidin302@gmail.com>
> wrote:
>
>> Helo
>>
>> On Mon, 26 Nov 2018 at 19:54 Zain Ulabidin <zainulabidin302@gmail.com>
>> wrote:
>>
>>> HELO
>>> --
>>> Interested in a meeting? Follow the link
>>> https://calendly.com/zainul/skype/
>>> Skype: zainulabidin302
>>>
>>> Regards
>>> Zain Ulabidin
>>>
>> --
>> Interested in a meeting? Follow the link
>> https://calendly.com/zainul/skype/
>> Skype: zainulabidin302
>>
>> Regards
>> Zain Ulabidin
>>
> --
> Interested in a meeting? Follow the link
> https://calendly.com/zainul/skype/
> Skype: zainulabidin302
>
> Regards
> Zain Ulabidin
>
-- 
Interested in a meeting? Follow the link https://calendly.com/zainul/skype/
Skype: zainulabidin302

Regards
Zain Ulabidin

--0000000000008ea6d1057b92c443
Content-Type: text/html; charset="UTF-8"
Content-Transfer-Encoding: quoted-printable

<div dir=3D"ltr">Hello</div><br><div class=3D"gmail_quote"><div dir=3D"ltr"=
>On Mon, 26 Nov 2018 at 19:55 Zain Ulabidin &lt;<a href=3D"mailto:zainulabi=
din302@gmail.com">zainulabidin302@gmail.com</a>&gt; wrote:<br></div><blockq=
uote class=3D"gmail_quote" style=3D"margin:0 0 0 .8ex;border-left:1px #ccc =
solid;padding-left:1ex"><div dir=3D"ltr">Hola</div><br><div class=3D"gmail_=
quote"><div dir=3D"ltr">On Mon, 26 Nov 2018 at 19:54 Zain Ulabidin &lt;<a h=
ref=3D"mailto:zainulabidin302@gmail.com" target=3D"_blank">zainulabidin302@=
gmail.com</a>&gt; wrote:<br></div><blockquote class=3D"gmail_quote" style=
=3D"margin:0 0 0 .8ex;border-left:1px #ccc solid;padding-left:1ex"><div dir=
=3D"ltr">Helo</div><br><div class=3D"gmail_quote"><div dir=3D"ltr">On Mon, =
26 Nov 2018 at 19:54 Zain Ulabidin &lt;<a href=3D"mailto:zainulabidin302@gm=
ail.com" target=3D"_blank">zainulabidin302@gmail.com</a>&gt; wrote:<br></di=
v><blockquote class=3D"gmail_quote" style=3D"margin:0 0 0 .8ex;border-left:=
1px #ccc solid;padding-left:1ex"><div dir=3D"ltr">HELO</div>-- <br><div dir=
=3D"ltr" class=3D"m_-7049248361377433832m_-6004224577706779530m_26495388206=
02352602gmail_signature" data-smartmail=3D"gmail_signature"><div dir=3D"ltr=
">Interested in a=C2=A0meeting? Follow the link <a href=3D"https://calendly=
.com/zainul/skype/" target=3D"_blank">https://calendly.com/zainul/skype/</a=
>=C2=A0<br><div>Skype: zainulabidin302</div><div><br></div><div>Regards=C2=
=A0</div><div>Zain Ulabidin<br></div></div></div>
</blockquote></div>-- <br><div dir=3D"ltr" class=3D"m_-7049248361377433832m=
_-6004224577706779530gmail_signature" data-smartmail=3D"gmail_signature"><d=
iv dir=3D"ltr">Interested in a=C2=A0meeting? Follow the link <a href=3D"htt=
ps://calendly.com/zainul/skype/" target=3D"_blank">https://calendly.com/zai=
nul/skype/</a>=C2=A0<br><div>Skype: zainulabidin302</div><div><br></div><di=
v>Regards=C2=A0</div><div>Zain Ulabidin<br></div></div></div>
</blockquote></div>-- <br><div dir=3D"ltr" class=3D"m_-7049248361377433832g=
mail_signature" data-smartmail=3D"gmail_signature"><div dir=3D"ltr">Interes=
ted in a=C2=A0meeting? Follow the link <a href=3D"https://calendly.com/zain=
ul/skype/" target=3D"_blank">https://calendly.com/zainul/skype/</a>=C2=A0<b=
r><div>Skype: zainulabidin302</div><div><br></div><div>Regards=C2=A0</div><=
div>Zain Ulabidin<br></div></div></div>
</blockquote></div>-- <br><div dir=3D"ltr" class=3D"gmail_signature" data-s=
martmail=3D"gmail_signature"><div dir=3D"ltr">Interested in a=C2=A0meeting?=
 Follow the link <a href=3D"https://calendly.com/zainul/skype/">https://cal=
endly.com/zainul/skype/</a>=C2=A0<br><div>Skype: zainulabidin302</div><div>=
<br></div><div>Regards=C2=A0</div><div>Zain Ulabidin<br></div></div></div>

--0000000000008ea6d1057b92c443--
