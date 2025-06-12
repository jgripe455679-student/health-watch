from nltk.corpus import wordnet as wn # type: ignore
import random
import math
from datetime import datetime
import functools

class Trend:
    _SYNONYM_SET_POSITIVE = {
        "rose",
        "grew",
        "expanded",
        "climbed"
    }
    
    _SYNONYM_SET_NEGATIVE = {
        "declined",
        "dropped",
        "dipped"
    }
    
    _SYNONYM_SET_STATIONARY = {
        "flat",
        "stable",
        "steady",
        "constant"
    }
    
    POSITIVE_PHRASE = "increased"
    NEGATIVE_PHRASE = "decreased"
    STATIONARY_PHRASE = "unchange"
    
    @classmethod
    @functools.lru_cache(maxsize=1)
    def _all_lemmas(cls, trend):
        synsets = wn.synsets(trend, pos=wn.VERB)
        return {lemma.name().replace("_", " ").lower()
                for syn in synsets for lemma in syn.lemmas()}
        
    @staticmethod
    def get_synonyms(trend, max_synonyms=8):
        wn_lemmas = Trend._all_lemmas(trend=trend)
        if trend == "increased":
            filtered = list(wn_lemmas & Trend._SYNONYM_SET_POSITIVE) or list(Trend._SYNONYM_SET_POSITIVE)
            if Trend.POSITIVE_PHRASE not in filtered:
                filtered.append(Trend.POSITIVE_PHRASE)
        elif trend == "decreased":
            filtered = list(wn_lemmas & Trend._SYNONYM_SET_NEGATIVE) or list(Trend._SYNONYM_SET_NEGATIVE)
            if Trend.NEGATIVE_PHRASE not in filtered:
                filtered.append(Trend.NEGATIVE_PHRASE)
        else:
            filtered = list(wn_lemmas & Trend._SYNONYM_SET_STATIONARY) or list(Trend._SYNONYM_SET_STATIONARY)
            if Trend.STATIONARY_PHRASE not in filtered:
                filtered.append(Trend.STATIONARY_PHRASE)
        
        return random.sample(filtered, min(len(filtered), max_synonyms))

class Indicator:
    _SYNONYM_SET = {
        "reflecting",
        "indicating",
        "demonstrating",
        "exhibiting"
    }
    
    VERB_PHRASE = "showing"
    
    @classmethod
    @functools.lru_cache(maxsize=1)
    def _all_lemmas(cls):
        synsets = wn.synsets("showing", pos=wn.VERB)
        return {lemma.name().replace("_", " ").lower()
                for syn in synsets for lemma in syn.lemmas()}
    
    @staticmethod
    def get_synonyms(max_synonyms=8):
        wn_lemmas = Indicator._all_lemmas()
        filtered = list(wn_lemmas & Indicator._SYNONYM_SET) or list(Indicator._SYNONYM_SET)
    
        if Indicator.VERB_PHRASE not in filtered:
            filtered.append(Indicator.VERB_PHRASE)
    
        if Indicator.VERB_PHRASE not in filtered:
            filtered.append(Indicator.VERB_PHRASE)

        return random.sample(filtered, min(len(filtered), max_synonyms))

class Comprised:
    _SYNONYM_SET = {
        "accounted for",
        "constituted",
        "composed",
        "made up",
        "represented"
    }
    
    VERB_PHRASE = "comprised"
    
    @staticmethod
    def get_synonyms(max_synonyms=8):
        synsets = wn.synsets("comprised", pos=wn.VERB)
        wn_lemmas = {lemma.name().replace("_", " ").lower()
                  for syn in synsets for lemma in syn.lemmas()}
    
        filtered = list(wn_lemmas & Comprised._SYNONYM_SET)
    
        if not filtered:
            filtered = list(Comprised._SYNONYM_SET)
    
        if Comprised.VERB_PHRASE not in filtered:
            filtered.append(Comprised.VERB_PHRASE)

        return random.sample(filtered, min(len(filtered), max_synonyms))

class NLGTemplate:
    def __init__(self, templates=None):
        self.templates = templates
    
    @staticmethod
    def format_period(start_period, end_period):
        start = datetime.strptime(start_period, "%Y-%m-%d").date()
        end = datetime.strptime(end_period, "%Y-%m-%d").date()
        
        if start.year == end.year and start.month == end.month:
            start_formatted = f"{start.strftime('%B')} {start.day}, {start.year}"
            end_formatted = f"{end.strftime('%B')} {end.day}, {end.year}"
            return start_formatted, end_formatted
        
        return f"{start.strftime('%B')} {start.year}", f"{end.strftime('%B')} {end.year}"
    
    def generate_record_count_descriptive_analytics(self, metric, growth_rate, start, end):
         tmpl = random.choice(self.templates)
         trend_key = Trend.POSITIVE_PHRASE if growth_rate >= 0 else Trend.NEGATIVE_PHRASE
         synonyms = Trend.get_synonyms(trend_key)
         verb = random.choice(synonyms) if synonyms else trend_key
         sp, ep = self.format_period(start, end)
         return tmpl.format(
             metric=metric,
             verb=verb,
             growth_rate=abs(growth_rate),
             start_period=sp,
             end_period=ep
         )
    
    def generate_service_usage_descriptive_analytics(self, metric, service, percentage, start, end):
        tmpl = random.choice(self.templates)
        synonyms = Comprised.get_synonyms()
        verb = random.choice(synonyms)
        sp, ep = self.format_period(start, end)
        return tmpl.format(
            metric=metric,
            service=service,
            verb=verb,
            percentage=percentage,
            start_period=sp,
            end_period=ep
        )
    
    def generate_health_condition_occurrence_descriptive_analytics(self, metric, health_condition, percentage, rate_of_change, start, end):
        tmpl = random.choice(self.templates)
        verb_synonyms = Comprised.get_synonyms()
        verb = random.choice(verb_synonyms)
        indicator_synonyms = Indicator.get_synonyms()
        indicator = random.choice(indicator_synonyms)
        trend_key = Trend.POSITIVE_PHRASE if rate_of_change >= 0 else Trend.NEGATIVE_PHRASE
        trend_synonyms = Trend.get_synonyms(trend_key)
        trend = random.choice(trend_synonyms) if trend_synonyms else trend_key
        sp, ep = self.format_period(start, end)
        return tmpl.format(
             metric=metric,
             health_condition=health_condition,
             verb=verb,
             percentage=percentage,
             indicator=indicator,
             rate_of_change=abs(rate_of_change),
             trend=trend,
             start_period=sp,
             end_period=ep
             )
        
    def generate_medical_problem_occurrence_descriptive_analytics(self, metric, health_condition, medical_problem, percentage, rate_of_change, start, end):
        tmpl = random.choice(self.templates)
        verb_synonyms = Comprised.get_synonyms()
        verb = random.choice(verb_synonyms)
        indicator_synonyms = Indicator.get_synonyms()
        indicator = random.choice(indicator_synonyms)
        trend_key = Trend.POSITIVE_PHRASE if rate_of_change > 0 else Trend.STATIONARY_PHRASE if rate_of_change == 0 else Trend.NEGATIVE_PHRASE
        trend_synonyms = Trend.get_synonyms(trend_key)
        trend = random.choice(trend_synonyms) if trend_synonyms else trend_key
        sp, ep = self.format_period(start, end)
        return tmpl.format(
             metric=metric,
             health_condition=health_condition,
             medical_problem=medical_problem,
             verb=verb,
             percentage=percentage,
             indicator=indicator,
             rate_of_change=abs(rate_of_change),
             trend=trend,
             start_period=sp,
             end_period=ep
             )
    
    def generate_demographics_analysis_descriptive_analytics(self, metric, age_group, percentage):
        tmpl = random.choice(self.templates)
        synonyms = Comprised.get_synonyms()
        verb = random.choice(synonyms)
        return tmpl.format(
            metric=metric,
            age_group=age_group,
            verb=verb,
            percentage=percentage
            )