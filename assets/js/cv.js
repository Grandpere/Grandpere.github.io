let cv = {
    localJsonUrl: 'assets/data/data.json',
    init: function () {
        cv.loadJson();
    },
    loadJson:function () {
        $.ajax({
           url: cv.localJsonUrl,
           dataType: 'json'
        }).done(function(data) {
            cv.createCvFromJson(data);
        }).fail(function (data) {
            console.error("Ajax failed ! ");
        });
    },
    createCvFromJson: function (data) {
        let resume = data.resume;
        let presentation = data.presentation;
        let experiences = data.experiences;
        let competences = data.competences;

        let $timelineWrapper = $('#demo-card-wrapper');

        $.each(experiences, function (experienceIndex, currentExperience) {
            let $htmlExperience = cv.createExperienceHtmlElement(currentExperience);

            $timelineWrapper.append($htmlExperience);
        });

        $timelineWrapper.attr('data-children', experiences.length);
        let countCard = experiences.length;
        // remove px on the height value for calculate wrapper height
        let regex = /\d+/g;
        let $demoCard = $('#timeline .demo-card').css('height');
        let matches = parseInt($demoCard.match(regex)[0]);
        let wrapperHeight;

        // mobile first : timeline wrapper
        wrapperHeight = '100%';
        // media query : if window > 1000px, timeline wrapper change
        if (window.matchMedia('(min-width: 1000px)').matches) {
            // 90 = card padding bottom + top = 45 + 45 // 135 = first card padding top - classic padding top => 180 - 45
            wrapperHeight = 0 === countCard %2 ? Math.ceil(countCard / 2) * (matches + 90) + 135 : Math.ceil(countCard / 2) * (matches + 90);
        }
        $timelineWrapper.css('height', wrapperHeight);
    },
    createExperienceHtmlElement: function (experience) {
        let $experience = $('#empty_demo-card').contents().clone();

        $experience.addClass('demo-card--'+experience.type);
        $experience.find('.number-box > span').html(experience.year);

        let periodCache = $experience.find('.head > h2').children();
        $experience.find('.head > h2').text(experience.title).prepend(periodCache);
        $experience.find('.head > h2 > .small').text(experience.period);

        let resume = experience.description.slice(0,experience.description.indexOf('.'));
        $experience.find('.body > p').text(resume.concat('...'));

        let cover = $experience.find('.content > img.content-image');
        cover.attr('src', experience.cover);
        cover.attr('alt', 'Image principale du projet '+experience.title);

        $experience.find('.content-details > a').attr('id', 'openModalProject'+experience.id);

        cv.addListeners(experience);

        return $experience;
    },
    addListeners: function (dataExperience) {
        let delegatedSelector = '#openModalProject'+dataExperience.id;
        // event delegation ==> .on('evtType', 'delegated selector', 'dataToSendFunction', 'function')
        $('#demo-card-wrapper').on('click', delegatedSelector, dataExperience, cv.createAndDisplayModal);

        // modal close event for reset elements
        $('#modalProject').on('hidden.bs.modal', function (evt) {
            cv.resetModal();
        })
    },
    createAndDisplayModal: function (evt) {
        let dataExperience = evt.data;

        // project title
        $('#modalProject').find('#modalProjectLongTitle').text(dataExperience.title);
        // carousel
        $.each(dataExperience.media , function (mediaIndex, currentMedia) {
            let $htmlLi = $('<li></li>');
            $htmlLi.attr('data-target', '#carouselExampleIndicators');
            $htmlLi.attr('data-slide-to', mediaIndex);

            let $carouselIndicators = $('ol.carousel-indicators');
            $carouselIndicators.append($htmlLi);

            let $htmlCarouselItem = $('<div></div>');
            $htmlCarouselItem.addClass('carousel-item');

            let $htmlImg = $('<img />');
            $htmlImg.addClass('d-block w-100');
            $htmlImg.attr('src', currentMedia.url);
            $htmlImg.attr('alt', currentMedia.alt);

            let $htmlDivOverlay = $('<div></div>');
            $htmlDivOverlay.addClass('carousel-img-overlay');

            let $htmlDivCaption = $('<div></div>');
            $htmlDivCaption.addClass('carousel-caption d-none d-md-block');

            let $htmlH5Caption = $('<h5></h5>');
            $htmlH5Caption.text(currentMedia.title);

            $htmlDivCaption.append($htmlH5Caption);

            $htmlCarouselItem.append($htmlImg);
            $htmlCarouselItem.append($htmlDivOverlay);
            $htmlCarouselItem.append($htmlDivCaption);

            $('.carousel-inner').append($htmlCarouselItem);
        });
        $('ol.carousel-indicators > li').first().addClass('active');
        $('div.carousel-inner > div').first().addClass('active');

        // project description
        $('#modalProject').find('.modal-body').text(dataExperience.description);
        // project links
        $.each(dataExperience.links, function (linkIndex, currentLink) {
            let $htmlLink = $('<a></a>');
            $htmlLink.attr('href', currentLink.url);
            $htmlLink.attr('title', currentLink.title);
            $htmlLink.text(currentLink.value);

            let $modalFooter = $('.modal-footer');
            $modalFooter.append($htmlLink);
        });
        // show modal
        $('#modalProject').modal('toggle');
    },
    resetModal: function () {
        $('#modalProject').find('#modalProjectLongTitle').text();
        $('#modalProject').find('.modal-body').text();
        $('.modal-footer').html('');
        $('ol.carousel-indicators').html('');
        $('.carousel-inner').html('');
    }
};

document.addEventListener('DOMContentLoaded', cv.init);