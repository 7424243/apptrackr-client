import React, {Component} from 'react'
import ResourceItem from '../ResourceItem/ResourceItem'
import SquareButton from '../SquareButton/SquareButton'
import './ResourcesList.css'

class ResourcesList extends Component {
    render() {
        return (
            <div>
                <section>
                    <div>
                        <h2>Job Boards</h2>
                        <ul>
                            <div>
                                <ResourceItem 
                                    name={'Indeed'} 
                                    url={'https://www.indeed.com/'}
                                />
                                <SquareButton 
                                    content={'x'}
                                    path={'/resources'}
                                />
                            </div>
                            <div>
                                <ResourceItem 
                                    name={'LinkedIn'} 
                                    url={'https://www.linkedin.com/jobs/?trk=li_sem_namer_careers_jobsgtm_Careers_NAMER_T1_USCA_Search_Google-Brand_DR-PRS_Multiple_Brand-LinkedIn-Jobs-Exact_Desktop_English_Core_network=g_campaign=11602008719_keyword=linkedin%20jobs&src=go-pa&veh=Careers_NAMER_T1_USCA_Search_Google-Brand_DR-PRS_Multiple_Brand-LinkedIn-Jobs-Exact_Desktop_English_Core_479259659412_linkedin%20jobs_c__kwd-1528692947_11602008719&mcid=&cname=Careers_NAMER_T1_USCA_Search_Google-Brand_DR-PRS_Multiple_Brand-LinkedIn-Jobs-Exact_Desktop_English_Core&camid=11602008719&asid=113158397036&keyword=linkedin%20jobs&targetid=kwd-1528692947&crid=479259659412&placement=&dev=c&gclid=Cj0KCQiA7NKBBhDBARIsAHbXCB7OLVWs8pYmpW31PIvUl-AppU9qdI8QLsUKJMSsiLifTs41no_v3aYaAhwZEALw_wcB'}
                                />
                                <SquareButton 
                                    content={'x'}
                                    path={'/resources'}
                                />
                            </div>
                            <div>
                                <ResourceItem 
                                    name={'Apprentice.at'} 
                                    url={'https://apprentice.at/'}
                                />
                                <SquareButton 
                                    content={'x'}
                                    path={'/resources'}
                                />
                            </div>
                        </ul>
                        <SquareButton 
                            content={'+'}
                            path={'/newresource'}
                        />
                    </div>
                </section>
                <hr/>
                <section>
                    <div>
                        <h2>Resume & Cover Letter Resources</h2>
                        <ul>
                            <div>
                                <ResourceItem 
                                    name={'Resume'} 
                                    url={'https://resumekraft.com/wp-content/uploads/2019/12/teacher-resume-example.jpg'}
                                />
                                <SquareButton 
                                    content={'x'}
                                    path={'/resources'}
                                />
                            </div>
                            <div>
                                <ResourceItem 
                                    name={'Cover Letter'} 
                                    url={'https://www.thebalancecareers.com/thmb/IC37LV1es8xHWzy2TdJi5sFvIbg=/1650x1275/filters:no_upscale():max_bytes(150000):strip_icc()/The_Balance_Cover_2060250Aug-edddc2451f264a6eb1c94cf627cb77ff.jpg'}
                                />
                                <SquareButton 
                                    content={'x'}
                                    path={'/resources'}
                                />
                            </div>
                            <div>
                                <ResourceItem 
                                    name={'Resume Optimizer'} 
                                    url={'https://skillsyncer.com/'}
                                />
                                <SquareButton 
                                    content={'x'}
                                    path={'/resources'}
                                />
                            </div>

                        </ul>
                        <SquareButton 
                            content={'+'}
                            path={'/newresource'}
                        />
                    </div>
                </section>
            </div>
        )
    }
}

export default ResourcesList