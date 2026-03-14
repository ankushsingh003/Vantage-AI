from typing import List, Dict, Any

class FeatureEngineer:
    """
    Handles extracting and normalizing features from raw company and market data
    before passing to the ML models.
    """
    
    # Core features identified in requirements
    FEATURES = [
        "revenue_growth_yoy", "gross_margin", "debt_equity_ratio",
        "customer_retention_rate", "market_share_delta",
        "gdp_growth", "inflation_rate", "industry_cagr",
        "social_sentiment_score", "competitor_count_delta"
    ]

    def build_feature_vector(self, company_data: Dict, market_data: Dict, industry_config: Dict) -> Dict[str, float]:
        """
        Combines company stats, macro/micro data, and industry weighting.
        """
        # In a real app, this would extract values, handle missing data,
        # apply industry modifiers, and scale/normalize.
        
        feature_vector = {}
        for feature in self.FEATURES:
            # Mock extraction
            raw_val = company_data.get(feature, market_data.get(feature, 0.0))
            
            # Apply industry weight if applicable
            weight = industry_config.get("weights", {}).get(feature, 1.0)
            
            feature_vector[feature] = raw_val * weight
            
        return feature_vector

    def build_time_series(self, historical_financials: List[Dict]) -> List[float]:
        """
        Builds the sequential data for the LSTM model.
        """
        # Mock extracting revenue sequence
        return [q.get("revenue", 0) for q in historical_financials]

feature_engineer = FeatureEngineer()
