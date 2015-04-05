$(function() {
    function getValueOrDefault(item, defaultValue){
        if(item === undefined || item === null){
            return defaultValue;
        }

        return item;
    }

    function validateProperties(data, properties){
        var errorCount = 0
        var errorMessages = []

        $.each(properties, function(){
            if(!data.hasOwnProperty(this)){
                errorCount++;
                errorMessages.push('property "' + this + '" is missing')
            }
        });

        return {
            errorCount: errorCount,
            errorMessages: errorMessages
        }
    }

    function validateResumeJson(data){
        var errorCount = 0
        var errorMessages = []

        var baseValidation = validateProperties(data, 
            [
                'person', 
                'synopsis', 
                'specializations', 
                'technicalKnowledge'
            ]
        );

        errorCount += baseValidation.errorCount;
        errorMessages = errorMessages.concat(baseValidation.errorMessages);

        if(data.hasOwnProperty('person')){
            var personValidation = validateProperties(data.person, 
                [
                    'firstName',
                    'lastName',
                    'emailAddress',
                    'phoneNumber',
                    'website'
                ]
            );

            errorCount += personValidation.errorCount;
            errorMessages = errorMessages.concat(personValidation.errorMessages);
        }

        if(data.hasOwnProperty('synopsis')){
            var synopsisValidation = validateProperties(data.synopsis, 
                [
                    'title',
                    'objective'
                ]
            );

            errorCount += synopsisValidation.errorCount;
            errorMessages = errorMessages.concat(synopsisValidation.errorMessages);
        }

        return {
            errorCount: errorCount,
            errorMessages: errorMessages
        }

        if(data.hasOwnProperty('technicalKnowledge')){
            var techValidation = validateProperties(data.technicalKnowledge, 
                [
                    'platforms',
                    'code',
                    'programs'
                ]
            );

            errorCount += techValidation.errorCount;
            errorMessages = errorMessages.concat(techValidation.errorMessages);
        }

        return {
            errorCount: errorCount,
            errorMessages: errorMessages
        }
    }

    $.getJSON(
        "/content/docs/resume.json"
    ).done(function(data){
        var validationResults = validateResumeJson(data)

        /* validation for bare minimums */
        if(validationResults.errorCount > 0){
            $.each(validationResults.errorMessages, function(){
                console.log(this);
            });

            return;
        }

        var generatedHtml = [];

        /* did-you-know section */
        generatedHtml.push(
            "<p class='did_you_know'>Did you know this page is " + 
            "<a href='/resumefiles/resume.js'>generated</a> from " + 
            "<a href='/resumefiles/resume.json'>JSON</a>?</p>"
        );

        /* person section */
        generatedHtml.push(
            "<section><h3>" + data.person.firstName + 
            " " + data.person.lastName + "</h3>"
        );

        /* contact section */
        generatedHtml.push(
            "<aside><p>Portfolio & website: " + data.person.website + 
            "</p><p>" + data.person.emailAddress + " - " +
            data.person.phoneNumber + "</p></aside>"
        );

        generatedHtml.push(
            "</section>"
        );

        /* synopsis section */
        generatedHtml.push(
            "<section><h3>" + data.synopsis.title + "</h3>"+
            "<p>" + data.synopsis.objective + "</p></section>"
        );

        /* specializations section */
        generatedHtml.push(
            "<section><h3>Specializations</h3><p><ul id='specializations'>"
        );

        $.each(data.specializations, function(){
            generatedHtml.push("<li>" + this + "</li>");
        });

        generatedHtml.push(
            "</ul></p></section>"
        );

        /* technical knowledge section */
        generatedHtml.push(
            "<section><h3>Technical</h3><h4>Platforms</h4><p><ul id='technical_platforms'>"
        );

        $.each(data.technicalKnowledge.platforms, function(){
            generatedHtml.push("<li>" + this + "</li>");
        });

        generatedHtml.push(
            "</ul></p><h4>Code</h4><p><ul id='technical_codes'>"
        );

        $.each(data.technicalKnowledge.code, function(){
            generatedHtml.push("<li>" + this + "</li>");
        });

        generatedHtml.push(
            "</ul></p><h4>Programs</h4><p><ul id='technical_programs'>"
        );

        $.each(data.technicalKnowledge.programs, function(){
            generatedHtml.push("<li>" + this + "</li>");
        });

        generatedHtml.push(
            "</ul></p></section>"
        );

        /* work experience sections */
        if(data.hasOwnProperty('workExperience') && data.workExperience.length > 0){
            generatedHtml.push(
                "<section><h3>Experience</h3>"
            );

            $.each(data.workExperience, function(){
                generatedHtml.push("<div class='work_experience_entry'>");
                if(this.hasOwnProperty('business')){
                    generatedHtml.push(
                        "<p><h4>" + getValueOrDefault(this.business.name, '') + " - " +
                        getValueOrDefault(this.business.location, '') + "</h4></p>"
                    );
                }

                if(this.hasOwnProperty('positions')){
                    $.each(this.positions, function(){
                        var timeSpan;

                        if(getValueOrDefault(this.positionStart, '') ==
                           getValueOrDefault(this.positionEnd, '')){
                            timeSpan = getValueOrDefault(this.positionStart, '');
                        } else {
                            timeSpan = getValueOrDefault(this.positionStart, '') + 
                            " - " +  getValueOrDefault(this.positionEnd, '')
                        }

                        generatedHtml.push(
                            "<p><h5>" + getValueOrDefault(this.jobTitle, '') + " (" +
                             timeSpan + ")</h5></p>"
                        );

                        generatedHtml.push(
                            "<p>" + getValueOrDefault(this.description, '') + "</p>"
                        );

                        if(this.hasOwnProperty('highlights') && this.highlights.length > 0){
                            generatedHtml.push(
                                "<h5>Highlights</h5><p><ul>"
                            );    
                        
                            $.each(this.highlights, function(){
                                generatedHtml.push(
                                    "<li>" + this + "</li>"
                                );    
                            });

                            generatedHtml.push(
                                "</ul></p>"
                            );    
                        }
                    });
                }
                generatedHtml.push("</div>");
            });

            generatedHtml.push(
                "</section>"
            );
        }

        /* education section */
        if(data.hasOwnProperty('education') && data.education.length > 0){
            generatedHtml.push(
                "<section><h3>Education</h3>"
            );

            $.each(data.education, function(){
                generatedHtml.push("<div class='education_entry'>");
                generatedHtml.push(
                    "<p><h4>" + getValueOrDefault(this.institution, '') + "</h4></p>"
                );

                generatedHtml.push(
                    "<p>" + getValueOrDefault(this.certification, '') + "</p>"
                );

                if(this.hasOwnProperty('gradePointAverage') && this.gradePointAverage !== null){
                    generatedHtml.push(
                        "<p>GPA: " + getValueOrDefault(this.gradePointAverage, '') + "</p>"
                    );
                }
                generatedHtml.push("</div>");
            });
        }

        /* generate result */
        $( "<div/>", {
            "class": "resumeContainer",
            "html": generatedHtml.join( "" )
        }).appendTo($('#resume_reserve'));
    }).fail(function( jqxhr, textStatus, error ) {
        var err = textStatus + ", " + error;
        console.log( "Request Failed: " + err );
    });
});