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
    public Exchange recordCountExchange() {
        return new DirectExchange("record_count_exchange");
    }

    @Bean
    public Exchange serviceUsageExchange() {
        return new DirectExchange("service_usage_exchange");
    }

    @Bean
    public Exchange healthConditionOccurrenceExchange() {
        return new DirectExchange("health_condition_occurrence_exchange");
    }

    @Bean
    public Exchange medicalProblemOccurrenceExchange() {
        return new DirectExchange("medical_problem_occurrence_exchange");
    }

    @Bean
    public Exchange demographicsAnalysisExchange() {
        return new DirectExchange("demographics_analysis_exchange");
    }

    @Bean
    public Queue countPatientVisitQueue() {
        return new Queue("count_patient_visit_queue");
    }

    @Bean
    public Queue calculateServiceUsageQueue() {
        return new Queue("calculate_service_usage_queue");
    }

    @Bean
    public Queue aggregateHealthConditionOccurrenceQueue() {
        return new Queue("aggregate_health_condition_occurrence_queue");
    }

    @Bean
    public Queue tallyMedicalProblemOccurrenceQueue() {
        return new Queue("tally_medical_problem_occurrence_queue");
    }

    @Bean
    public Queue demographicsAnalysisDescriptiveAnalyticsQueue() {
        return new Queue("demographics_analysis_descriptive_analytics_queue");
    }

    @Bean
    public Queue demographicsAnalysisDescriptiveAnalyticsResultQueue() {
        return new Queue("demographics_analysis_descriptive_analytics_result_queue");
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
    public Queue medicalProblemOccurrenceDescriptiveAnalyticsQueue() {
        return new Queue("medical_problem_occurrence_descriptive_analytics_queue", true);
    }

    @Bean
    public Queue medicalProblemOccurrenceDescriptiveAnalyticsResultQueue() {
        return new Queue("medical_problem_occurrence_descriptive_analytics_result_queue", true);
    }

    @Bean
    public Queue healthConditionOccurrenceDescriptiveAnalyticsQueue() {
        return new Queue("health_condition_occurrence_descriptive_analytics_queue", true);
    }

    @Bean
    public Queue healthConditionOccurrenceDescriptiveAnalyticsResultQueue() {
        return new Queue("health_condition_occurrence_descriptive_analytics_result_queue", true);
    }

    @Bean
    public Queue serviceUsageDescriptiveAnalyticsQueue() {
        return new Queue("service_usage_descriptive_analytics_queue", true);
    }

    @Bean
    public Queue serviceUsageDescriptiveAnalyticsResultQueue() {
        return new Queue("service_usage_descriptive_analytics_result_queue", true);
    }

    @Bean
    public Queue recordCountDescriptiveAnalyticsQueue() {
        return new Queue("record_count_descriptive_analytics_queue", true);
    }

    @Bean
    public Queue recordCountDescriptiveAnalyticsResultQueue() {
        return new Queue("record_count_descriptive_analytics_result_queue", true);
    }

    @Bean
    public Binding countPatientVisitBinding(FanoutExchange rawRecordsExchange, Queue countPatientVisitQueue) {
        return BindingBuilder.bind(countPatientVisitQueue)
                .to(rawRecordsExchange);
    }

    @Bean
    Binding calculateServiceUsageBinding(FanoutExchange rawRecordsExchange, Queue calculateServiceUsageQueue) {
        return BindingBuilder.bind(calculateServiceUsageQueue)
                .to(rawRecordsExchange);
    }

    @Bean
    Binding aggregateHealthConditionOccurrenceBinding(FanoutExchange rawRecordsExchange,
            Queue aggregateHealthConditionOccurrenceQueue) {
        return BindingBuilder.bind(aggregateHealthConditionOccurrenceQueue)
                .to(rawRecordsExchange);
    }

    @Bean
    Binding tallyMedicalProblemOccurrenceBinding(FanoutExchange rawRecordsExchange,
            Queue tallyMedicalProblemOccurrenceQueue) {
        return BindingBuilder.bind(tallyMedicalProblemOccurrenceQueue)
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

    @Bean
    public Binding recordCountDescriptiveAnalyticsBinding(Queue recordCountDescriptiveAnalyticsQueue,
            Exchange recordCountExchange) {
        return BindingBuilder.bind(recordCountDescriptiveAnalyticsQueue)
                .to(recordCountExchange)
                .with("record_count_descriptive_analytics_routing_key")
                .noargs();
    }

    @Bean
    public Binding recordCountDescriptiveAnalyticsResultBinding(Queue recordCountDescriptiveAnalyticsResultQueue,
            Exchange recordCountExchange) {
        return BindingBuilder.bind(recordCountDescriptiveAnalyticsResultQueue)
                .to(recordCountExchange)
                .with("record_count_descriptive_analytics_result_routing_key")
                .noargs();
    }

    @Bean
    public Binding serviceUsageDescriptiveAnalyticsBinding(Queue serviceUsageDescriptiveAnalyticsQueue,
            Exchange serviceUsageExchange) {
        return BindingBuilder.bind(serviceUsageDescriptiveAnalyticsQueue)
                .to(serviceUsageExchange)
                .with("service_usage_descriptive_analytics_routing_key")
                .noargs();
    }

    @Bean
    public Binding serviceUsageDescriptiveAnalyticsResultBinding(Queue serviceUsageDescriptiveAnalyticsResultQueue,
            Exchange serviceUsageExchange) {
        return BindingBuilder.bind(serviceUsageDescriptiveAnalyticsResultQueue)
                .to(serviceUsageExchange)
                .with("service_usage_descriptive_analytics_result_routing_key")
                .noargs();
    }

    @Bean
    public Binding healthConditionOccurrenceDescriptiveAnalyticsBinding(
            Queue healthConditionOccurrenceDescriptiveAnalyticsQueue,
            Exchange healthConditionOccurrenceExchange) {
        return BindingBuilder.bind(healthConditionOccurrenceDescriptiveAnalyticsQueue)
                .to(healthConditionOccurrenceExchange)
                .with("health_condition_occurrence_descriptive_analytics_routing_key")
                .noargs();
    }

    @Bean
    public Binding healthConditionOccurrenceDescriptiveAnalyticsResultBinding(
            Queue healthConditionOccurrenceDescriptiveAnalyticsResultQueue,
            Exchange healthConditionOccurrenceExchange) {
        return BindingBuilder.bind(healthConditionOccurrenceDescriptiveAnalyticsResultQueue)
                .to(healthConditionOccurrenceExchange)
                .with("health_condition_occurrence_descriptive_analytics_result_routing_key")
                .noargs();
    }

    @Bean
    public Binding medicalProblemOccurrenceDescriptiveAnalyticsBinding(
            Queue medicalProblemOccurrenceDescriptiveAnalyticsQueue, Exchange medicalProblemOccurrenceExchange) {
        return BindingBuilder.bind(medicalProblemOccurrenceDescriptiveAnalyticsQueue)
                .to(medicalProblemOccurrenceExchange)
                .with("medical_problem_occurrence_descriptive_analytics_routing_key")
                .noargs();
    }

    @Bean
    public Binding medicalProblemOccurrenceDescriptiveAnalyticsResultBinding(
            Queue medicalProblemOccurrenceDescriptiveAnalyticsResultQueue, Exchange medicalProblemOccurrenceExchange) {
        return BindingBuilder.bind(medicalProblemOccurrenceDescriptiveAnalyticsResultQueue)
                .to(medicalProblemOccurrenceExchange)
                .with("medical_problem_occurrence_descriptive_analytics_result_routing_key")
                .noargs();
    }

    @Bean
    public Binding demographicsAnalysisDescriptiveAnalyticsBinding(Queue demographicsAnalysisDescriptiveAnalyticsQueue,
            Exchange demographicsAnalysisExchange) {
        return BindingBuilder.bind(demographicsAnalysisDescriptiveAnalyticsQueue)
                .to(demographicsAnalysisExchange)
                .with("demographics_analysis_descriptive_analytics_routing_key")
                .noargs();
    }

    @Bean
    public Binding demographicsAnalysisDescriptiveAnalyticsResultBinding(
            Queue demographicsAnalysisDescriptiveAnalyticsResultQueue, Exchange demographicsAnalysisExchange) {
        return BindingBuilder.bind(demographicsAnalysisDescriptiveAnalyticsResultQueue)
                .to(demographicsAnalysisExchange)
                .with("demographics_analysis_descriptive_analytics_result_routing_key")
                .noargs();
    }
}
