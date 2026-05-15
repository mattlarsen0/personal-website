import { StyleProp, Text, TextStyle, View } from "react-native";
import ResumeList from "../resumeList";
import useStyles from '../styles/styles';
import HR from "../utils/hr";
  
export default function Resume() {
    const styles = useStyles(false);
    
    return (
        <View style={{flexDirection: 'column', width: 750 }}>
            <Text style={styles.h1}>Matthew Larsen</Text>
            <Text style={styles.h2}>Experience</Text>
            <Text style={styles.h3}>Columbia Sportswear Company ◦ Senior Software Engineer ◦ August 2021 to June 2025</Text>
            <HR />
            <ResumeList
                data={[
                    "Developed full stack features using JavaScript frameworks and backend services in an agile environment, enhancing e-commerce platforms for multiple brands.",
                    "Mentored junior developers through pair programming and knowledge transfer sessions, fostering team growth and code quality.",
                    "Conducted code reviews and wrote tests to ensure maintainable and robust software releases.",
                    "Managed database operations and contributed to system scalability and performance.",
                    "Wrote documentation for new and legacy features, created developer environment set-up documents.",
                ]}
            />
            <Text style={styles.h3}>Avinode ◦ Software Engineer ◦ August 2018 to March 2021</Text>
            <HR />
            <ResumeList
                data={[
                    "Built and maintained React and C# .NET MVC web pages for a flight operations application, focusing on user experience and functionality.",
                    "Developed and optimized SQL scripts for database management including stored procedures and indexes.",
                    "Enhanced build tools and infrastructure automation using C# and PowerShell to improve deployment efficiency."
                ]}
            />
            <Text style={styles.h3}>Graphic Products ◦ Web Developer ◦ October 2017 to August 2018</Text>
            <HR />
            <ResumeList
                data={[
                    "Built and maintained React and C# .NET MVC web pages for a flight operations application, focusing on user experience and functionality.",
                    "Developed and optimized SQL scripts for database management including stored procedures and indexes.",
                    "Enhanced build tools and infrastructure automation using C# and PowerShell to improve deployment efficiency.",
                    "Developed full stack C# .NET MVC pages for an e-commerce website, applying agile methodologies to deliver features.",
                    "Updated and maintained custom Umbraco CMS using AngularJS and C# .NET to improve content management.",
                ]}
            />
            <Text style={styles.h3}>Convoyant ◦ Software Engineer ◦ May 2014 to June 2017</Text>
            <HR />
            <ResumeList
                data={[
                    "Full stack development of C# .NET MVC and Web Forms pages for a reservation and management application.",
                    "Managed relational databases by writing SQL scripts to create tables, keys, and indexes, ensuring data integrity.",
                ]}
            />
            <Text style={styles.h2}>Projects at Columbia Sportswear</Text>
            <Text style={styles.h3}>Salesforce Order Management (SFOM) - August 2024 to June 2025</Text>
            <ResumeList
                data={[
                    "Greenfield development of a new order management platform for our brands.",
                    "Built Azure Functions to process and route orders within a new downstream management system.",
                    "Collaborated with our offshore SFOM team to standardize and migrate legacy order data.",
                    "Deployed software, maintained JIRA workflows, and authored technical documentation."
                ]}
            />
            <Text style={styles.h3}>AWS Lambda Node Upgrades - January 2024 to June 2024</Text>
            <ResumeList
                data={[
                    "Assisted in updates of AWS Lambda Node.js stack to Node v20 from Node v14.",
                    "Created documentation and collaborated with junior developers to complete tasks.",
                ]}
            />
            <Text style={styles.h3}>Education</Text>
            <HR />
            <Text style={styles.centerText}>Portland State University • B.S. in Computer Science - Portland, OR - 3.3 GPA</Text>
        </View>
    );
}
