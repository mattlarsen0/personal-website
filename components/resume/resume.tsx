import { Text, View } from 'react-native';
import ResumeList from '../resumeList';
import useStyles from '../../hooks/styles/useStyles';
import HR from '../utils/hr';

export default function Resume() {
    const styles = useStyles();

    return (
        <View style={{flexDirection: 'column', width: '100%', maxWidth: 1000}}>
            <View style={{paddingBottom: 20}}>
                <Text style={styles.h2}>Summary</Text>
                <HR />
                <Text style={styles.text}>
                    Senior Software Engineer with 10 years of experience designing, developing, and maintaining
                    full-stack web applications and backend services. Proven expertise in C#, .NET, JavaScript, SQL,
                    AWS, and Azure. Experienced in e-commerce, order management systems, cloud services, database
                    design, and mentoring developers in agile environments
                </Text>
            </View>
            <Text style={styles.h2}>Experience</Text>
            <HR />
            <Text style={{...styles.h3, marginTop: 20}}>Columbia Sportswear Company</Text>
            <Text style={styles.h4}>Senior Software Engineer</Text>
            <Text style={styles.h4}>August 2021 to June 2025</Text>
            <HR />
            <ResumeList
                data={[
                    'Developed full-stack features and backend services with C#, JavaScript, AWS, and Azure, improving e-commerce platforms for four retail brands in an agile development environment.',
                    'Mentored a group of six junior developers across multiple teams through pair programming and knowledge-sharing sessions, fostering team growth and code quality.',
                    'Conducted code reviews and developed automated tests to ensure maintainable and reliable weekly software releases.',
                    'Managed database operations and contributed to system scalability and performance.',
                    'Authored technical documentation, onboarding guides, and developer environment setup procedures to be used by 30 developers in our department.',
                    'Owned and improved the reliability of a critical order management system handling thousands of orders weekly, contributing to over one year without production regressions.',
                    'Collaborated with business stakeholders to gather requirements, document solutions in Confluence, and define Jira work items for order management initiatives.'
                ]}
            />
            <Text style={{...styles.h3, marginTop: 20}}>Avinode</Text>
            <Text style={styles.h4}>Software Engineer</Text>
            <Text style={styles.h4}>August 2018 to March 2021</Text>
            <HR />
            <ResumeList
                data={[
                    'Developed and maintained React and C# .NET MVC applications for a web-based flight operations platform.',
                    'Designed and optimized SQL queries, stored procedures, and indexes to improve database performance and maintainability.',
                    'Enhanced build tools and infrastructure automation using C# and PowerShell to improve deployment efficiency.',
                    'Designed, developed, deployed, and supported the FlightBridge integration, collaborating directly with clients to gather requirements and resolve issues.'
                ]}
            />
            <Text style={{...styles.h3, marginTop: 20}}>Graphic Products</Text>
            <Text style={styles.h4}>Web Developer</Text>
            <Text style={styles.h4}>October 2017 to August 2018</Text>
            <HR />
            <ResumeList
                data={[
                    'Developed full-stack C# .NET MVC features for a high-volume e-commerce platform, applying agile methodologies to deliver features.',
                    'Updated and maintained custom Umbraco CMS using AngularJS and C# .NET to improve content management.'
                ]}
            />
            <Text style={{...styles.h3, marginTop: 20}}>Convoyant</Text>
            <Text style={styles.h4}>Software Engineer</Text>
            <Text style={styles.h4}>May 2014 to June 2017</Text>
            <HR />
            <ResumeList
                data={[
                    'Developed full-stack C# .NET MVC and Web Forms applications for reservation and management systems.',
                    'Managed relational databases by writing SQL scripts to create tables, keys, and indexes, ensuring data integrity.',
                    'Designed and implemented a MyAllocator integration that increased monthly revenue by approximately $10,000.'
                ]}
            />
            <Text style={styles.h2}>Projects</Text>
            <HR />
            <Text style={styles.h3}>Salesforce Order Management (SFOM) - August 2024 to June 2025</Text>
            <ResumeList
                data={[
                    'Contributed to greenfield development of a Salesforce Order Management platform supporting multiple retail brands.',
                    'Built Azure Functions to process and route orders within a new downstream management system.',
                    'Collaborated with our offshore SFOM team to standardize and migrate legacy order data.',
                    'Deployed software, maintained JIRA workflows, and authored technical documentation.'
                ]}
            />
            <Text style={styles.h3}>AWS Lambda Node Upgrades - January 2024 to June 2024</Text>
            <ResumeList
                data={[
                    'Designed and developed a personal portfolio website and Android application using React Native and TypeScript.',
                    'Implemented complex state management and interactive features, including a fully playable Snake game.',
                    'Deployed and hosted services using Cloudflare infrastructure.'
                ]}
            />
            <Text style={styles.h2}>Education</Text>
            <HR />
            <View style={styles.centerContainer}>
                <Text style={styles.text}>Portland State University • B.S. in Computer Science - Portland, OR - 3.3 GPA</Text>
            </View>
        </View>
    );
}
