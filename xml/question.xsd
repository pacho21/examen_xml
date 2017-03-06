<?xml version="1.0" encoding="UTF-8"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">

  <xs:element name="questions">
    <xs:complexType>
      <xs:sequence maxOccurs="unbounded">
        <xs:element ref="question"/>
      </xs:sequence>
    </xs:complexType>
  </xs:element>

  <xs:element name="question">
    <xs:complexType>
      <xs:sequence>
        <xs:element ref="type"/>
        <xs:element ref="title"/>
        <xs:sequence minOccurs="0" maxOccurs="unbounded">
          <xs:element ref="option"/>
        </xs:sequence>
        <xs:sequence maxOccurs="unbounded">
          <xs:element ref="answer"/>
        </xs:sequence>
      </xs:sequence>
      <xs:attribute name="id" type="xs:string" use="required"/>
    </xs:complexType>
  </xs:element>

  <xs:element name="type" type="xs:string"/>

  <xs:element name="title" type="xs:string"/>

  <xs:element name="option" type="xs:string"/>

  <xs:element name="answer" type="xs:string"/>

</xs:schema>
