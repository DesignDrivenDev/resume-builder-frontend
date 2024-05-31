// import React from "react";
// import {
//   PDFDownloadLink,
//   Page,
//   Text,
//   View,
//   Document,
//   StyleSheet,
// } from "@react-pdf/renderer";

// const styles = StyleSheet.create({
//   page: { padding: 30 },
//   section: { marginBottom: 10 },
// });

// type User = {
//   firstName: string;
//   lastName: string;
//   email: string;
//   address: string;
//   mobileNumber: string;
//   experiences: string[];
//   projects: string[];
//   hobbies: string[];
//   socialMediaUrls: string[];
// };

// type PDFResumeProps = {
//   user: User;
// };

// const PDFResume: React.FC<PDFResumeProps> = ({ user }) => (
//   <Document>
//     <Page style={styles.page}>
//       <View style={styles.section}>
//         <Text>
//           {user.firstName} {user.lastName}
//         </Text>
//         <Text>{user.email}</Text>
//         <Text>{user.address}</Text>
//         <Text>{user.mobileNumber}</Text>
//       </View>
//       <View style={styles.section}>
//         <Text>Experiences:</Text>
//         {user.experiences.map((exp, index) => (
//           <Text key={index}>{exp}</Text>
//         ))}
//       </View>
//       <View style={styles.section}>
//         <Text>Projects:</Text>
//         {user.projects.map((proj, index) => (
//           <Text key={index}>{proj}</Text>
//         ))}
//       </View>
//       <View style={styles.section}>
//         <Text>Hobbies:</Text>
//         {user.hobbies.map((hobby, index) => (
//           <Text key={index}>{hobby}</Text>
//         ))}
//       </View>
//       <View style={styles.section}>
//         <Text>Social Media:</Text>
//         {user.socialMediaUrls.map((url, index) => (
//           <Text key={index}>{url}</Text>
//         ))}
//       </View>
//     </Page>
//   </Document>
// );

// const PDFResumeDownload: React.FC<PDFResumeProps> = ({ user }) => (
//   <PDFDownloadLink document={<PDFResume user={user} />} fileName="resume.pdf">
//     {({ loading }: { loading: any }) =>
//       loading ? "Generating PDF..." : "Download PDF"
//     }
//   </PDFDownloadLink>
// );

// export default PDFResumeDownload;

import React from "react";
import {
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { marginBottom: 10 },
});

type User = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  mobileNumber: string;
  experiences: string[];
  projects: { title: string; description: string }[];
  hobbies: string[];
  socialMediaUrls: string[];
};

type PDFResumeProps = {
  user: User;
};

const PDFResume: React.FC<PDFResumeProps> = ({ user }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text>
          {user.firstName} {user.lastName}
        </Text>
        <Text>{user.email}</Text>
        <Text>{user.address}</Text>
        <Text>{user.mobileNumber}</Text>
      </View>
      <View style={styles.section}>
        <Text>Experiences</Text>
        {user.experiences.map((exp, index) => (
          <Text key={index}>{exp}</Text>
        ))}
      </View>
      <View style={styles.section}>
        <Text>Projects</Text>
        {user.projects.map((proj, index) => (
          <View key={index}>
            <Text>{proj.title}</Text>
            <Text>{proj.description}</Text>
          </View>
        ))}
      </View>
      <View style={styles.section}>
        <Text>Hobbies</Text>
        {user.hobbies.map((hobby, index) => (
          <Text key={index}>{hobby}</Text>
        ))}
      </View>
      <View style={styles.section}>
        <Text>Social Media URLs</Text>
        {user.socialMediaUrls.map((url, index) => (
          <Text key={index}>{url}</Text>
        ))}
      </View>
    </Page>
  </Document>
);

const PDFResumeDownload: React.FC<PDFResumeProps> = ({ user }) => (
  <PDFDownloadLink
    document={<PDFResume user={user} />}
    fileName={`${user.firstName}_${user.lastName}_Resume.pdf`}
  >
    {({ blob, url, loading, error }) =>
      loading ? "Loading document..." : "Download Resume"
    }
  </PDFDownloadLink>
);

export default PDFResumeDownload;
