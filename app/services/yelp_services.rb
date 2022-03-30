class YelpService

    API_HOST = "https://api.yelp.com"
    SEARCH_PATH = "/v3/businesses/search"
    BUSINESS_PATH = "/v3/businesses/"
    DEFAULT_BUSINESS_ID = "yelp-new-york"
    DEFAULT_TERM = "pizzeria"
    SEARCH_LIMIT = 25

    API_KEY = ENV["API_KEY"]

    def self.search(location)
        url = "#{API_HOST}#{SEARCH_PATH}"
        params = {
        term: DEFAULT_TERM,
        location: location,
        limit: SEARCH_LIMIT
        }
        response = HTTP.auth("Bearer #{API_KEY}").get(url, params: params)
        response.parse
    end


end
