package com.crawler.backend.config;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Exchange;
import org.springframework.amqp.core.FanoutExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class RabbitMQConfig {

    @Bean
    public FanoutExchange rawRecordsExchange() {
        return new FanoutExchange("raw_records_exchange");
    }

    @Bean
    public Exchange rawProfilesExchange() {
        return new DirectExchange("raw_profiles_exchange");
    }

    @Bean
    public Queue countPatientVisitQueue() {
        return new Queue("count_patient_visit_queue");
    }

    // @Bean
    // public Queue aggregateHealthMetricsQueue() {
    //     return new Queue("aggregate_health_metrics_queue");
    // }

    @Bean
    public Queue aggregateBloodPressureTrendsQueue() {
        return new Queue("aggregate_blood_pressure_trends_queue");
    }

    @Bean
    public Queue bmiAnalysisQueue() {
        return new Queue("bmi_analysis_queue");
    }

    @Bean
    public Queue calculateDepartmentUsageQueue() {
        return new Queue("calculate_department_usage_queue");
    }

    @Bean
    public Queue profileDemographicsAnalysisQueue() {
        return new Queue("profile_demographics_analysis_queue", true);
    }

    @Bean
    public Queue profileDemographicsAnalysisResultQueue() {
        return new Queue("profile_demographics_analysis_result_queue", true);
    }

    @Bean
    public Binding countPatientVisitBinding(FanoutExchange rawRecordsExchange, Queue countPatientVisitQueue) {
        return BindingBuilder.bind(countPatientVisitQueue)
                .to(rawRecordsExchange);
    }

    // @Bean
    // public Binding aggregateHealthMetricsBinding(FanoutExchange rawRecordsExchange, Queue aggregateHealthMetricsQueue) {
    //     return BindingBuilder.bind(aggregateHealthMetricsQueue)
    //             .to(rawRecordsExchange);
    // }

    @Bean
    public Binding aggregateBloodPressureTrendsBinding(FanoutExchange rawRecordsExchange, Queue aggregateBloodPressureTrendsQueue) {
        return BindingBuilder.bind(aggregateBloodPressureTrendsQueue)
                .to(rawRecordsExchange);
    }

    @Bean
    public Binding bmiAnalysisBinding(FanoutExchange rawRecordsExchange, Queue bmiAnalysisQueue) {
        return BindingBuilder.bind(bmiAnalysisQueue)
                .to(rawRecordsExchange);
    }

    @Bean
    public Binding calculateDepartmentUsageBinding(FanoutExchange rawRecordsExchange,
            Queue calculateDepartmentUsageQueue) {
        return BindingBuilder.bind(calculateDepartmentUsageQueue)
                .to(rawRecordsExchange);
    }

    @Bean
    public Binding profileDemographicsAnalysisBinding(Queue profileDemographicsAnalysisQueue,
            Exchange rawProfilesExchange) {
        return BindingBuilder.bind(profileDemographicsAnalysisQueue)
                .to(rawProfilesExchange)
                .with("profile_demographics_analysis_routing_key")
                .noargs();
    }

    @Bean
    public Binding profileDemographicsAnalysisResultBinding(Queue profileDemographicsAnalysisResultQueue,
            Exchange rawProfilesExchange) {
        return BindingBuilder.bind(profileDemographicsAnalysisResultQueue)
                .to(rawProfilesExchange)
                .with("profile_demographics_analysis_result_routing_key")
                .noargs();
    }
}
